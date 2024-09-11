type JSONValue = string | number | boolean | null | JSONObject | JSONArray;
interface JSONArray extends Array<JSONValue> {}

interface JSONObject {
    [key: string]: JSONValue;
}


function getShapes(json: JSONValue): JSONArray | null {
    if (Array.isArray(json))
        return json;
    
    else if (typeof json === 'object' && json !== null) {
        for (const key in json) {
            if (json.hasOwnProperty(key)) {
                const result = getShapes(json[key]);
                
                if (result) {
                    return result;
                }
            }
        }
    }

    return null;
}

export default getShapes;
