type RowObj = {
	name: string;
	status: string;
	date: string;
	progress: number;
};

const tableDataComplex: RowObj[] = [
	{
		name: 'ALL(Except DOS)',
		progress: 75.5,
		status: 'Text',
		date: 'system'
	},
	{
		name: 'ALL(Include DOS)',
		progress: 25.5,
		status: 'Text',
		date: 'system'
	},
	{
		name: 'V2X (Excluding Network Congestion)',
		progress: 90,
		status: 'Text',
		date: 'system'
	},
	{
		name: 'V2X (Including Network Resilience)',
		progress: 50.5,
		status: 'Text',
		date: 'system'
	}
];
export default tableDataComplex;
