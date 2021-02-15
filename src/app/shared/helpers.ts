export function createPatchUpdateBody(object: any, propertyNames: string[]){
    let body = [];
    for(let propertyName of propertyNames){
      body.push(
        {
          op: "replace",
          path: "/"+propertyName,
          value: object[propertyName]
        }
      );
    }

    return body;
  }