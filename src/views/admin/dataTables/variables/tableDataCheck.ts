type RowObj = {
	name: string;
	log: string;
  };

const tableDataCheck: RowObj[] = [
	{
		name: '2024.04.05 - 09:22:24',
		log: 'Critical: Unauthorized access attempt detected on V2X communication channel.',
	},
	{
		name: '2024.04.05 - 09:22:35',
		log: 'Info: Successful firmware update completed for onboard vehicle systems.',
	},
	{
		name: '2024.04.05 - 09:22:45',
		log: 'Error: Connection failure with vehicle-to-infrastructure (V2I) server.',
	},
	{
		name: '2024.04.05 - 09:22:45',
		log: 'Error: Connection failure with vehicle-to-infrastructure (V2I) server.',
	},
];

export default tableDataCheck;
