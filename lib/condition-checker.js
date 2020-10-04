"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckSimpleCondition = void 0;
var CheckSimpleCondition = function (conditionString, notReportedLabel) {
    // checking if value is not defined
    if (conditionString.includes('<<not')) {
        var possibleValue = conditionString.split('<<not')[0];
        return (possibleValue === undefined ||
            possibleValue === '' ||
            possibleValue.trim() === '' ||
            conditionString.includes(notReportedLabel));
    }
    // checking if value is in list
    if (conditionString.includes('<<include')) {
        var splitted_1 = conditionString.split('<<include');
        if (splitted_1.length === 1) {
            return false;
        }
        var toCompareArray = splitted_1[1].split(',');
        return (toCompareArray.findIndex(function (value) {
            return splitted_1[0].includes(value.substring(value.indexOf('<') + 1, value.indexOf('>')));
        }) > -1);
    }
    // checking if value is not in list
    if (conditionString.includes('<<out')) {
        var splitted_2 = conditionString.split('<<out');
        if (splitted_2.length === 1) {
            // console.log("[Renderer - CheckSimpleCondition] Use of <<out without value(s) to compare");
            return false;
        }
        var toCompareArray = splitted_2[1].split(',');
        return (toCompareArray.findIndex(function (value) {
            return value.substring(value.indexOf('<') + 1, value.indexOf('>')).includes(splitted_2[0]);
        }) === -1);
    }
    // checking if value (should be a number) is greater than or equals a number
    if (conditionString.includes('>>=')) {
        var splitted = conditionString.split('>>=');
        if (Number.isNaN(Number(splitted[0]).valueOf()) && Number(splitted[1]).valueOf()) {
            // console.log("[Renderer - CheckSimpleCondition] Use of >>= to compare a string ith a number")
            return false;
        }
        return Number(splitted[0]).valueOf() >= Number(splitted[1]).valueOf();
    }
    // checking if value (should be a number) is greater than a number
    if (conditionString.includes('>>')) {
        var splitted = conditionString.split('>>');
        if (Number.isNaN(Number(splitted[0]).valueOf()) && Number(splitted[1]).valueOf()) {
            // console.log("[Renderer - CheckSimpleCondition] Use of >> to compare a string ith a number")
            return false;
        }
        return Number(splitted[0]).valueOf() > Number(splitted[1]).valueOf();
    }
    // checking if value (should be a number) is less than or equals a number
    if (conditionString.includes('<<=')) {
        var splitted = conditionString.split('<<=');
        if (Number.isNaN(Number(splitted[0]).valueOf()) && Number(splitted[1]).valueOf()) {
            // console.log("[Renderer - CheckSimpleCondition] Use of <<= to compare a string ith a number")
            return false;
        }
        return Number(splitted[0]).valueOf() <= Number(splitted[1]).valueOf();
    }
    // checking if value (should be a number) is lesser than a number
    if (conditionString.includes('<<')) {
        var splitted = conditionString.split('<<');
        if (Number.isNaN(Number(splitted[0]).valueOf()) && Number(splitted[1]).valueOf()) {
            // console.log("[Renderer - CheckSimpleCondition] Use of << to compare a stringw ith a number")
            return false;
        }
        return Number(splitted[0]).valueOf() < Number(splitted[1]).valueOf();
    }
    // checking if value is equals to another value
    if (conditionString.includes('==')) {
        var splitted = conditionString.split('==');
        // only double == to be able to compare number as string with string etc (should avoid some typo)
        return splitted[0].trim() === splitted[1].trim();
    }
    // No condition sign match, we just check the existence of the variable
    // Since a specific label is append when the value is not in the list, we juste check for this label
    return !conditionString.includes(notReportedLabel);
};
exports.CheckSimpleCondition = CheckSimpleCondition;
