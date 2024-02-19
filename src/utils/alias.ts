
export const networkAlias: any = {
    // alias    table명
    id: {              
      name : "",     // 0
      align : 'start',
      width : '3%',
    }, 
    Accurancy: {       
      name : "정확도", // 1
      align : 'center',
      width : '4%',
    },
    Time: {            
      name : "탐지시각", // 2
      align : 'start',
      width : '8%',
    },
    PcName: {
      name : "PC명",     // 3
      align : 'start',
      width : '7%',
    },
    Agent_ip: {
      name : "Agent Ip", // 4 
      align : 'start',
      width : '6%',
    },
    SrcIp: {
      name : "출발지 Ip", // 5
      align : 'start',
      width : '6%',
    },
    SrcPort: {
      name : "출발지 Port", // 6
      align : 'center',
      width : '3%',
    },
    DstIp: {
      name : "목적지 Ip", // 7
      align : 'start',
      width : '6%',
    },
    DstPort: {
      name : "목적지 Port", // 8
      align : 'center',
      width : '3%',
    },
    Process: {
      name : "프로세스명", // 9
      align : 'start',
      width : 'auto',
    },
    PIDs: {
      name : "PID", // 10
      align : 'center',
      width : '3%',
    },
    SrcFile: {
      name : "유출 파일명", // 11
      align : 'start',
      width : '15%',
    },
    DownLoad: {
      name : "파일 다운로드", // 12
      align : 'center',
      width : '50px',
    },
    ScreenShot: {
      name : "스크린샷", // 13
      align : 'center',
      width : '50px',
    },
    FileSizes: {
      name : "파일크기", // 14
      align : 'start',
      width : 'auto',
    },
    Keywords: {
      name : "탐지패턴", // 15
      align : 'start',
      width : '15%',
    },
    DestFiles: {
      name : "URL", // 16
      align : 'start',
      width : '8%',
    },
  };

  export const mediaAlias:any = {
    // alias    table명
    'id' :  {
      name : '',                   // 0
      align : 'start',
      width : '3%',
    },
    'Time' : {
      name : '탐지시각',           // 1
      align : 'start',
      width : '8%',
    },
    'PcName' : {
      name : 'PC명',           // 2
      align : 'start',
      width : '7%',
    },
    'Agent_ip' : {
      name : 'Agent Ip',       // 3
      align : 'start',
      width : '6%',
    },
    'Process' : {
      name : '프로세스명',         // 4
      align : 'start',
      width : '5%',
    },
    'Media_Type' : {
      name : '유출 유형',   // 5
      align : 'center',
      width : '5%',
    },
    'Files' : {
      name : '유출 파일명',              // 6
      align : 'center',
      width : 'auto',
    },
    // 'Copied_files' : {
    //   name : '복사본', // 7
    //   align : 'start',
    //   width : 'auto',
    // },
    'Downloading' : {
      name : '파일 다운로드',  // 8
      align : 'center',
      width : '2%',
    },
    'FileSizes' : {
      name : '파일 크기',     // 9
      align : 'center',
      width : '3%',
    },
    'Keywords' : {
      name : '탐지패턴',       // 10
      align : 'start',
      width : '25%',
    },
  };

  export const outlookAlias:any = {
    // alias    table명
    'id' : {
      name : '',                    // 0
      align : 'start',
      width : '3%',
    },
    'Time' : {
      name : '탐지시각',                // 1
      align : 'start',
      width : '8%',
    },
    'PcName' : {
      name : 'PC명',            // 2
      align : 'start',
      width : '7%',
    },
    'Agent_ip' : {
      name : 'Agent Ip',        // 3
      align : 'start',
      width : '6%',
    },
    'Process' : {
      name : '프로세스명',          // 4
      align : 'start',
      width : '5%',
    },
    'PIDS' : {
      name : 'pid',                 // 5
      align : 'start',
      width : '3%',
    },
    'Mail_Subjects' : {
      name : '메일명',    // 6
      align : 'start',
      width : 'auto',
    },
    'Sender' : {
      name : '보낸사람',            // 7
      align : 'start',
      width : '8%',
    },
    'Receiver' : {
      name : '받은사람',        // 8
      align : 'start',
      width : '8%',
    },
    'AttachedFiles' : {
      name : '유출 파일명', // 9
      align : 'start',
      width : 'auto',
    },
    'CopiedFiles' : {
      name : '전송갯수',   // 10
      align : 'center',
      width : '2%',
    },
    'Downloading' : {
      name : '파일 다운로드',   // 11
      align : 'center',
      width : '2%',
    },
    'FileSizes' : {
      name : '파일 크기',      // 12
      align : 'start',
      width : '4%',
    },
    'Keywords' : {
      name : '탐지 패턴',        // 13
      align : 'start',
      width : 'auto',
    },
  };

  export const printAlias:any = {
    // alias    table명
    'id' : {
      name : '',                       // 0
      align : 'start',
      width : '3%',
    },
    'Time' : {
      name : '탐지시각',                   // 1
      align : 'start',
      width : '8%',
    },
    'PcName' : {
      name : 'PC명',               // 2
      align : 'start',
      width : '7%',
    },
    'Agent_ip' : {
      name : 'Agent Ip',           // 3
      align : 'start',
      width : '6%',
    },
    'Process' : {
      name : '프로세스명',             // 4
      align : 'start',
      width : '5%',
    },
    'PIDs' : {
      name : 'pid',                    // 5
      align : 'center',
      width : '3%',
    },
    'Printers' : {
      name : '프린터',            // 6
      align : 'start',
      width : '15%',
    },
    'Owners' : {
      name : '관리자',                // 7
      align : 'center',
      width : '5%',
    },
    'Documents' : {
      name : '인쇄 파일명',          // 8
      align : 'center',
      width : 'auto',
    },
    // 'Copied_Spool_Files' : {
    //   name : '복사본', // 9
    //   align : 'start',
    //   width : 'auto',
    // },
    'Downloading' : {
      name : '파일 다운로드',        // 10
      align : 'center',
      width : '3%',
    },
    'Sizes' : {
      name : '복사본 크기',                  // 11
      align : 'start',
      width : '5%',
    },
    'Pages' : {
      name : '페이지',                 // 12
      align : 'center',
      width : '3%',
    },
  };

  export const userAlias: any = {
    id:"id",
    username:"사용자 계정명",
    privilege:"등급",
    enabled:"상태",
    ip_ranges:"IP 관리 대역"
  }

  export const complexAlias:any = {
    id:'id',
    pc_name:"PC명",
    proc_name:"프로세스명",
    backup_file:"유출 파일명",
    media_type:"유출 유형",
    org_file:"유출 파일명",
    sender:"보낸사람",
    printer:"프린터",
    doc_name:"탐지문서"
  }