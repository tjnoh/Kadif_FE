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

// 추후 treeData 형식 확인시
// const treeData = [
//     {
//       tc_group: 'V2X',
//       expanded: true,
//       checked: true,
//       children: [
//         {
//           tc_id: 1,
//           tc_name: 'TC-V2X-I-01',
//           tc_context: '1609.2 SPDU 서명 검증',
//           tc_group: 'V2X',
//           tc_parameter : [
//             {
//               name : 'a',
//               type : 'number',
//               value : '0',
//               default : '0'
//             }, 
//             {
//               name : 'b',
//               type : 'string',
//               value : '',
//               default : ''
//             }, 
//             {
//               name : 'c',
//               type : 'boolean',
//               value : 'false',
//               default : 'false'
//             }
//           ],
//           checked: false,
//         },
//         {
//           tc_id: 2,
//           tc_name: 'TC-V2X-I-02',
//           tc_context: 'DE_VehicleEventFlags가 발생했을 때 IUT가 전송하는 인증서의 형태를 검증',
//           tc_group: 'V2X',
//           checked: true,
//           tc_parameter : [
//             {
//               name : 'a',
//               type : 'number',
//               value : '0',
//               default : '0'
//             }, 
//             {
//               name : 'b',
//               type : 'string',
//               value : '',
//               default : ''
//             }, 
//             {
//               name : 'c',
//               type : 'boolean',
//               value : 'false',
//               default : 'false'
//             }
//           ],
//         },
//         {
//           tc_id: 3,
//           tc_name: 'TC-V2X-I-03',
//           tc_context: '인증서 GenerationTime값 검증',
//           tc_group: 'V2X',
//           checked: false,
//         },
//       ],
//     },
//     {
//       tc_group: 'IVN',
//       checked: false,
//       children: [
//         {
//           tc_id: 4,
//           tc_name: 'TC-IVN-CAN-1',
//           tc_context: '특정 CAN Bus에 정의되지 CAN ID 메시지가 전송될 경우 탐지하는지 확인',
//           tc_group: 'IVN',
//           checked: false,
//         },
//         {
//           tc_id: 5,
//           tc_name: 'TC-IVN-CAN-2',
//           tc_context: '일치하지 않는 DLC를 가지는 CAN 메시지가 전송될 경우 탐지하는지 확인',
//           tc_group: 'IVN',
//           checked: false,
//         },
//         {
//           tc_id: 6,
//           tc_name: 'TC-IVN-CAN-3',
//           tc_context: '메시지가 빠른 주기로 전송될 경우 탐지하는지 확인',
//           tc_group: 'IVN',
//           checked: false,
//         },
//       ],
//     },
//   ];

export default tableDataCheck;
