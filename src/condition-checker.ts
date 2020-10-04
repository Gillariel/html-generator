const CheckSimpleCondition = (conditionString: string, notReportedLabel: string) => {
  // checking if value is not defined
  if (conditionString.includes('<<not')) {
    const possibleValue = conditionString.split('<<not')[0];
    return (
      possibleValue === undefined ||
      possibleValue === '' ||
      possibleValue.trim() === '' ||
      conditionString.includes(notReportedLabel)
    );
  }

  // checking if value is in list
  if (conditionString.includes('<<include')) {
    const splitted = conditionString.split('<<include');
    if (splitted.length === 1) {
      return false;
    }
    const toCompareArray = splitted[1].split(',');
    return (
      toCompareArray.findIndex((value) =>
        splitted[0].includes(value.substring(value.indexOf('<') + 1, value.indexOf('>'))),
      ) > -1
    );
  }
  // checking if value is not in list
  if (conditionString.includes('<<out')) {
    const splitted = conditionString.split('<<out');
    if (splitted.length === 1) {
      // console.log("[Renderer - CheckSimpleCondition] Use of <<out without value(s) to compare");
      return false;
    }
    const toCompareArray = splitted[1].split(',');
    return (
      toCompareArray.findIndex((value) =>
        value.substring(value.indexOf('<') + 1, value.indexOf('>')).includes(splitted[0]),
      ) === -1
    );
  }
  // checking if value (should be a number) is greater than or equals a number
  if (conditionString.includes('>>=')) {
    const splitted = conditionString.split('>>=');
    if (Number.isNaN(Number(splitted[0]).valueOf()) && Number(splitted[1]).valueOf()) {
      // console.log("[Renderer - CheckSimpleCondition] Use of >>= to compare a string ith a number")
      return false;
    }
    return Number(splitted[0]).valueOf() >= Number(splitted[1]).valueOf();
  }
  // checking if value (should be a number) is greater than a number
  if (conditionString.includes('>>')) {
    const splitted = conditionString.split('>>');
    if (Number.isNaN(Number(splitted[0]).valueOf()) && Number(splitted[1]).valueOf()) {
      // console.log("[Renderer - CheckSimpleCondition] Use of >> to compare a string ith a number")
      return false;
    }
    return Number(splitted[0]).valueOf() > Number(splitted[1]).valueOf();
  }
  // checking if value (should be a number) is less than or equals a number
  if (conditionString.includes('<<=')) {
    const splitted = conditionString.split('<<=');
    if (Number.isNaN(Number(splitted[0]).valueOf()) && Number(splitted[1]).valueOf()) {
      // console.log("[Renderer - CheckSimpleCondition] Use of <<= to compare a string ith a number")
      return false;
    }
    return Number(splitted[0]).valueOf() <= Number(splitted[1]).valueOf();
  }
  // checking if value (should be a number) is lesser than a number
  if (conditionString.includes('<<')) {
    const splitted = conditionString.split('<<');
    if (Number.isNaN(Number(splitted[0]).valueOf()) && Number(splitted[1]).valueOf()) {
      // console.log("[Renderer - CheckSimpleCondition] Use of << to compare a stringw ith a number")
      return false;
    }
    return Number(splitted[0]).valueOf() < Number(splitted[1]).valueOf();
  }
  // checking if value is equals to another value
  if (conditionString.includes('==')) {
    const splitted = conditionString.split('==');
    // only double == to be able to compare number as string with string etc (should avoid some typo)
    return splitted[0].trim() === splitted[1].trim();
  }
  // No condition sign match, we just check the existence of the variable
  // Since a specific label is append when the value is not in the list, we juste check for this label
  return !conditionString.includes(notReportedLabel);
};

export { CheckSimpleCondition };
