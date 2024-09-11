import fs from 'fs';
import path from 'path';
import { ProductTypes } from '../types/productTypes';

const dataFilePath = path.join(__dirname,'../../../productData.json');//path of the file

//data reading from file
const readData = () => {
    const data = fs.readFileSync(dataFilePath,'utf-8');
    return JSON.parse(data);
}

//data writing to file
const writeData = (data:ProductTypes[]) => {
    fs.writeFileSync(dataFilePath,JSON.stringify(data,null,2));
}

export{
    readData,writeData
}