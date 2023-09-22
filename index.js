const createEmployeeRecord = function(array) {
    let employeeRecord = {};

    employeeRecord.firstName = array[0];
    employeeRecord.familyName = array[1];
    employeeRecord.title = array[2];
    employeeRecord.payPerHour = array[3];

    employeeRecord.timeInEvents = [];
    employeeRecord.timeOutEvents = [];

    return employeeRecord;
};

const createEmployeeRecords = function(arrayOfRecords){
    let employeeRecords = arrayOfRecords.map((array) => {
        return createEmployeeRecord(array);
    });

    return employeeRecords;
};

const createTimeInEvent = function(dateStamp){
    let timeIn = {
        type: "TimeIn",
        hour: parseInt(dateStamp.split(" ")[1], 10),
        date: dateStamp.split(" ")[0]
    };

    this.timeInEvents.push(timeIn);

    return this;
};

const createTimeOutEvent = function(dateStamp){
    let timeOut = {
        type: "TimeOut",
        hour: parseInt(dateStamp.split(" ")[1], 10),
        date: dateStamp.split(" ")[0]
    };

    this.timeOutEvents.push(timeOut);

    return this;
};

const hoursWorkedOnDate = function(dateOfHours){
    let timeInEvent = this.timeInEvents.find(event => event.date === dateOfHours);
    let timeOutEvent = this.timeOutEvents.find(event => event.date === dateOfHours);

    let timeInHour = timeInEvent.hour;
    let timeOutHour = timeOutEvent.hour;

    let hoursWorked = (timeOutHour - timeInHour)/100;

    return hoursWorked;    
};

const wagesEarnedOnDate = function(dateOfWages){
    let hoursWorked = hoursWorkedOnDate.call(this, dateOfWages);

    let wagesEarned = (hoursWorked * this.payPerHour);

    return wagesEarned;
};

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0)

    return payable
};

const findEmployeeByFirstName = function(employeeRecords, firstName){
    return employeeRecords.find(employeeRecord => employeeRecord.firstName === firstName);
};

const calculatePayroll = function(employeeRecords){
     return employeeRecords.reduce(function (totalPay, employeeRecord) {
        return totalPay + allWagesFor.call(employeeRecord)
     }, 0);
};