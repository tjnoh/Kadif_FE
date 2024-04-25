type RowObj = {
	name: string;
	progress: string;
	quantity: number;
	date: string; 
};

const tableDataColumns: RowObj[] = [
	{
		name: 'TC-IVN-CAN-Logical-None-Function-01',
		quantity: 2458,
		progress: 'passed',
		date: '12 Jan 2021', 
	},
	{
		name:'TC-IVN-CAN-Logical-None-Function-02',
		quantity: 1485,
		progress: 'passed',
		date: '21 Feb 2021', 
	},
	{
		name: 'TC-IVN-CAN-Logical-None-Function-03',
		quantity: 1024,
		progress: 'passed',
		date: '13 Mar 2021', 
	},
	{
		name: 'TC-IVN-CAN-Logical-None-Function-04',
		quantity: 858,
		progress: 'failed',
		date: '24 Jan 2021', 
	}, 
];

export default tableDataColumns;
