import { google } from 'googleapis';
import TOKEN from './token.json' with { type: "json" };
let spreadsheetsID = TOKEN.spreadsheetsID;

async function read(cells, client){
    const sheets = google.sheets({ version: 'v4', auth: client });
    const response = await sheets.spreadsheets.values.get({
        spreadsheetId: spreadsheetsID,
        range: cells,
    });
    return response.data.values;
}

async function write(cells, values, client){
    const sheets = google.sheets({ version: 'v4', auth: client });
    const resource = { values };
    const response = await sheets.spreadsheets.values.update({
        spreadsheetId: spreadsheetsID,
        range: cells,
        valueInputOption: 'USER_ENTERED',
        resource,
    });
    return response.data;
}

async function append(cells, values, client){
    const sheets = google.sheets({ version: 'v4', auth: client });
    const resource = { values };
    const response = await sheets.spreadsheets.values.append({
        spreadsheetId: spreadsheetsID,
        range: cells,
        valueInputOption: 'USER_ENTERED',
        resource,
    });
    return response.data;
}

export { read, write, append };
