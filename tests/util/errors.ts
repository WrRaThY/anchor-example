const debugMode: boolean = (process.env.debug == "true")
console.log(`tests running in debug mode = ${debugMode}`);

//this is needed to see values for error enums
export async function debugLoggingWrapper(fn) {
  if (debugMode) {
    try {
      return await fn();
    } catch (err) {
      console.log("===========TEST ERROR DEBUG===========");
      console.log(err);
      throw err;
    }
  } else {
    return await fn();
  }
}

export function debugLog(desc: string, objectToPrint?: any) {
  if (debugMode) {
    console.log(desc);

    if (objectToPrint != undefined) {
      console.log(objectToPrint);
    }
  } //else nothing
}
