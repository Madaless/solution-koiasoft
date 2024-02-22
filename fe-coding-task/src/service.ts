import axios from 'axios';
import { ApiResponse } from './types';


export const getTheData = (range: string[], selectedBoligType: string) => {
    console.log(selectedBoligType)
    const apiUrl = 'https://data.ssb.no/api/v0/no/table/07241';

    const requestBody = {
        query: [
            {
                code: 'Boligtype',
                selection: {
                    filter: 'item',
                    values: [selectedBoligType],
                },
            },
            {
                code: 'ContentsCode',
                selection: {
                    filter: 'item',
                    values: ['KvPris'],
                },
            },
            {
                code: 'Tid',
                selection: {
                    filter: 'item',
                    values: range
                },
            },
        ],
        response: {
            format: 'json-stat2',
        },
    };

    return axios.post<ApiResponse>(apiUrl, requestBody, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
}


