type RowObj = {
	name: string;
	distinction: string;
	author: string;
	progress: number;
};

const tableDataComplex: RowObj[] = [
	{
		name: 'ALL(Except DOS)',
		progress: 75.5,
		distinction: 'Comprehensive Security Scan Policy',
		author: 'system'
	},
	{
		name: 'ALL(Include DOS)',
		progress: 25.5,
		distinction: 'Inclusive Security Scan Policy',
		author: 'system'
	},
	{
		name: 'V2X (Excluding Network Congestion)',
		progress: 90,
		distinction: 'V2X Communication Security Policy',
		author: 'system'
	},
	{
		name: 'V2X (Including Network Resilience)',
		progress: 50.5,
		distinction: 'Comprehensive V2X Connectivity Policy',
		author: 'system'
	}
];
export default tableDataComplex;
