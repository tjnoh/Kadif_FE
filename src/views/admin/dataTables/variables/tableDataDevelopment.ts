type RowObj = {
	id: number;
	name: string;
	policy: string;
	user: string;
	progress: number;
};

const tableDataComplex: RowObj[] = [
	{
		id: 178,
		name: '2024.04.05 - 09:22:25',
		policy: 'ALL(Except DOS)',
		user: 'User1',
		progress: 75.5
	},
	{
		id: 177,
		name: '2024.04.04 - 16:31:12',
		policy: 'ALL(Except DOS)',
		user: 'User3',
		progress: 35.4
	},
	{
		id: 176,
		name: '2024.04.04 - 13:23:18',
		policy: 'ALL(Except DOS)',
		user: 'User3',
		progress: 25
	},
	{
		id: 175,
		name: '2024.04.04 - 10:43:38',
		policy: 'V2X (Excluding Network Congestion)',
		user: 'User2',
		progress: 100
	},
	{
		id: 174,
		name: '2024.04.03 - 17:51:41',
		policy: 'V2X (Excluding Network Congestion)',
		user: 'User1',
		progress: 75.5
	},
	{
		id: 173,
		name: '2024.04.03 - 15:11:24',
		policy: 'ALL(Include DOS)',
		user: 'User1',
		progress: 75.5
	},
	{
		id: 172,
		name: '2024.04.03 - 14:04:21',
		policy: 'ALL(Include DOS)',
		user: 'User1',
		progress: 75.5
	},
	{
		id: 171,
		name: '2024.04.03 - 13:35:02',
		policy: 'V2X (Excluding Network Congestion)',
		user: 'User3',
		progress: 35.4
	},
	{
		id: 170,
		name: '2024.04.02 - 18:29:30',
		policy: 'ALL(Include DOS)',
		user: 'User3',
		progress: 25
	},
	{
		id: 169,
		name: '2024.04.02 - 16:42:17',
		policy: 'V2X (Excluding Network Congestion)',
		user: 'User2',
		progress: 100
	},
	{
		id: 168,
		name: '2024.04.02 - 12:57:36',
		policy: 'ALL(Include DOS)',
		user: 'User1',
		progress: 75.5
	}
];
export default tableDataComplex;
