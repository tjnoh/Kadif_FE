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
		status: 'Comprehensive Security Scan Policy',
		date: 'system'
	},
	{
		name: 'ALL(Include DOS)',
		progress: 25.5,
		status: 'Inclusive Security Scan Policy',
		date: 'system'
	},
	{
		name: 'V2X (Excluding Network Congestion)',
		progress: 90,
		status: 'V2X Communication Security Policy',
		date: 'system'
	},
	{
		name: 'V2X (Including Network Resilience)',
		progress: 50.5,
		status: 'Comprehensive V2X Connectivity Policy',
		date: 'system'
	}
];
export default tableDataComplex;
