
import csv from "csv-parser";
import fs from "node:fs";
import { Artist } from "../artists/artists.types";
class CsvHelper {
    static csvToJson (filePath:string){
    return new Promise((resolve,reject)=>{
        const filesRows: Artist[] = [];

        fs.createReadStream(filePath)
        .pipe(csv())
        .on("data", (data) => filesRows.push(data))
        .on("end", () => {
            fs.unlinkSync(filePath);
            resolve(filesRows)
        })
        .on("error",(err)=>{
            // * remove temp file
             fs.unlinkSync(filePath);
            reject(err);
        })
        
        
    })
    }
    static jsonToCsv = async(jsonArray:any[])=>{
        if(jsonArray.length === 0) return;
        const keys = Object.keys(jsonArray[0]);
        const csvRows = [keys.join('/')];

        jsonArray.forEach((obj)=>{
            const values = keys.map((key)=>obj[key]);
            csvRows.push(values.join(','))
        });

        return csvRows.join("\n");
    
    }
}

export default CsvHelper;