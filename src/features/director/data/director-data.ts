export type Education = {
  id: string;
  period: string;
  degree: string;
  institution: string;
  details?: string;
};

export type Career = {
  id: string;
  period: string;
  role: string;
  organization: string;
};

export type Project = {
  id: string;
  period: string;
  title: string;
  agency: string;
  status: "Ongoing" | "Past";
};

export type Patent = {
  id: string;
  title: string;
  number: string;
  date: string;
  status: "Registered" | "Filed";
};

export const educationData: Education[] = [
  {
    id: "phd",
    period: "2006.03 ~ 2010.08",
    degree: "Ph.D. in Computer Engineering",
    institution: "Kyung Hee University",
    details:
      'Thesis: "Energy-efficient, Reliable, and Flexible Data Transmission in Wireless Personal Area Networks"',
  },
  {
    id: "ms",
    period: "2004.03 ~ 2006.02",
    degree: "M.S. in Computer Engineering",
    institution: "Kyung Hee University",
  },
  {
    id: "bs",
    period: "2000.03 ~ 2004.02",
    degree: "B.S. in Electronic Engineering",
    institution: "Kyung Hee University",
  },
];

export const careerData: Career[] = [
  {
    id: "c1",
    period: "2021.03 ~ Current",
    role: "Assistant Professor",
    organization:
      "Dept. of Computer Software Engineering, Soonchunhyang University",
  },
  {
    id: "c2",
    period: "2017.09 ~ 2021.02",
    role: "Assistant Professor",
    organization: "School of Computer Software, Daegu Catholic University",
  },
  {
    id: "c3",
    period: "2015.09 ~ 2017.08",
    role: "Assistant Professor",
    organization:
      "Dept. of Computer Software Engineering, Changshin University",
  },
  {
    id: "c4",
    period: "2015.05 ~ 2015.08",
    role: "Research Staff",
    organization: "R&D Division, GITC",
  },
  {
    id: "c5",
    period: "2013.04 ~ 2015.04",
    role: "Research Staff",
    organization: "AirPlug, Inc.",
  },
  {
    id: "c6",
    period: "2010.08 ~ 2013.04",
    role: "Research Staff",
    organization: "Communication Lab., LIG Nex1 Co., Ltd.",
  },
];

export const projectData: Project[] = [
  {
    id: "p1",
    period: "2025.07 ~ 2026.02",
    title:
      "AI기반 스마트시티 클린 시스템 개발 / Development of AI-based clean systems of a smart city",
    agency: "Aigenn",
    status: "Ongoing",
  },
  {
    id: "p2",
    period: "2021.03 ~ 2025.02",
    title:
      "멀티도메인 모바일 사물인터넷의 지능 서비스를 위한 인텐트 기반 자율 네트워킹 기술 연구",
    agency: "NRF",
    status: "Past",
  },
  {
    id: "p3",
    period: "2022.03 ~ 2025.02",
    title: "네트워크 상태 인지를 위한 데이터 학습 모델 개발",
    agency: "LIG Nex1",
    status: "Past",
  },
  {
    id: "p4",
    period: "2022.07 ~ 2024.12",
    title:
      "스마트시티 구축을 위한 지능형 5G/6G 핵심 인프라 기술 개발",
    agency: "IITP",
    status: "Past",
  },
  {
    id: "p5",
    period: "2020.06 ~ 2021.12",
    title:
      "혁신조달 연계형 신기술 R&D 사업 / A Study on AI-based Monitoring System for Wildlife",
    agency: "MOTIE",
    status: "Past",
  },
  {
    id: "p6",
    period: "2016.11 ~ 2019.10",
    title:
      "원거리 사물인터넷의 산업용 응용을 위한 LPWAN 프레임워크 연구",
    agency: "NRF",
    status: "Past",
  },
  {
    id: "p7",
    period: "2016.11 ~ 2017.10",
    title:
      "LTE망과 센서를 이용하여 산업재해 예방 및 대응을 위한 모듈식 웨어러블 디바이스 및 위치검출 어플리케이션 개발",
    agency: "SMBA",
    status: "Past",
  },
  {
    id: "p8",
    period: "2015.09 ~ 2016.08",
    title:
      "AHRS 기반 영유아 건강체크 웨어러블 디바이스 및 솔루션 개발",
    agency: "SMBA",
    status: "Past",
  },
  {
    id: "p9",
    period: "2013.04 ~ 2015.04",
    title:
      "Multiple Access Optimization (MAO) in Heterogeneous Wireless Networks",
    agency: "AirPlug",
    status: "Past",
  },
  {
    id: "p10",
    period: "2010.08 ~ 2013.04",
    title:
      "Development of Radio Systems Based on Mobile Ad-hoc Networks for Network Centric Warfare",
    agency: "LIG Nex1",
    status: "Past",
  },
  {
    id: "p11",
    period: "2006.11 ~ 2010.08",
    title: "A Study on East-West Neo Medical u-Life Care Technology",
    agency: "MIC ITRC",
    status: "Past",
  },
  {
    id: "p12",
    period: "2008.09 ~ 2010.08",
    title:
      "m-MediNet: Enabling Smart Medical Spaces over Wireless Body Area Networks",
    agency: "KOSEF",
    status: "Past",
  },
  {
    id: "p13",
    period: "2009.01 ~ 2010.08",
    title: "Future Convergence Service Platform Research Team",
    agency: "KRF BK21",
    status: "Past",
  },
  {
    id: "p14",
    period: "2007.08 ~ 2009.07",
    title:
      "A Study on Common Radio Resource Management in Next-generation Overlaid Wireless Networks",
    agency: "KRF",
    status: "Past",
  },
  {
    id: "p15",
    period: "2006.04 ~ 2006.10",
    title:
      "A Study on Next Generation Mobile Network Architecture for Optimized Integration of Heterogeneous Wireless Networks",
    agency: "ETRI",
    status: "Past",
  },
  {
    id: "p16",
    period: "2005.07 ~ 2006.06",
    title: "A Study on Mobility Support for Wireless Sensor Network",
    agency: "KRF",
    status: "Past",
  },
  {
    id: "p17",
    period: "2005.06 ~ 2005.11",
    title:
      "A Study on Service Modeling and Infrasystem Architecture for Next-generation Mobile Communication System",
    agency: "ETRI",
    status: "Past",
  },
  {
    id: "p18",
    period: "2004.05 ~ 2005.05",
    title:
      "Implementation and Performance Enhancement of W-LAN/3G Dual-mode Terminal",
    agency: "Samsung Electronics",
    status: "Past",
  },
  {
    id: "p19",
    period: "2004.06 ~ 2004.11",
    title:
      "A Study on Integrating 2.3GHz Portable Internet into W-LAN and 3G Network",
    agency: "ETRI",
    status: "Past",
  },
];

export const patentData: Patent[] = [
  {
    id: "pat-1",
    title:
      "연산 효율성이 높은 2D-CNN 모델을 활용하여 위치 기반 그룹화 기법을 통한 다중 객체를 인식하는 방법 및 그 장치",
    number: "10-2024-0165124",
    date: "2024.11.19",
    status: "Filed",
  },
  {
    id: "pat-2",
    title:
      "MTC(machine type communication) 장치 및 데이터 어그리게이션 기반 업링크 전송방법",
    number: "10-2724677",
    date: "2024.10.28",
    status: "Registered",
  },
  {
    id: "pat-3",
    title:
      "딥러닝 알고리즘을 활용한 스마트팩토리 내 산업용 팬에서 발생하는 노이즈 분석 방법 및 그 장치",
    number: "10-2024-0047085",
    date: "2024.04.08",
    status: "Filed",
  },
  {
    id: "pat-4",
    title: "위임된 노드 증명방식 기반 보안 데이터 전송방법",
    number: "10-2331237",
    date: "2021.11.22",
    status: "Registered",
  },
  {
    id: "pat-5",
    title: "저전력 광역통신망에서 멀티캐스트 업링크 데이터 전송 방법",
    number: "10-2289980",
    date: "2021.08.09",
    status: "Registered",
  },
  {
    id: "pat-6",
    title:
      "디바이스 클러스터링에 기반한 로라 통신 네트워크 시스템 및 데이터 전송 방법",
    number: "10-2178880",
    date: "2020.11.09",
    status: "Registered",
  },
  {
    id: "pat-7",
    title:
      "모바일 비디오의 품질향상을 위한 모바일 에지 클라우드에서의 트래픽 관리 방법 및 이를 위한 장치",
    number: "10-2046713",
    date: "2019.11.13",
    status: "Registered",
  },
  {
    id: "pat-8",
    title:
      "저전력 광역 네트워크에서 트래픽 특성을 고려한 이중 채널 매체 접근 제어 방법 및 장치",
    number: "10-2010670",
    date: "2019.08.07",
    status: "Registered",
  },
  {
    id: "pat-9",
    title: "다종 네트워크에서 접속 네트워크를 선택하는 방법",
    number: "10-1745580",
    date: "2017.06.02",
    status: "Registered",
  },
  {
    id: "pat-10",
    title: "로라 무선 통신을 이용한 통신 서비스 제공 방법",
    number: "10-2017-0008288",
    date: "2017.01.17",
    status: "Filed",
  },
  {
    id: "pat-11",
    title: "데이터 왜곡을 방지할 수 있는 인터넷 네트워크 시스템",
    number: "10-2016-175762",
    date: "2016.12.21",
    status: "Filed",
  },
  {
    id: "pat-12",
    title:
      "사물인터넷 네트워크에서 게이트웨이의 부하를 분산 제어하는 방법",
    number: "10-2016-175763",
    date: "2016.12.21",
    status: "Filed",
  },
  {
    id: "pat-13",
    title: "방화셔터 동작 제어 시스템",
    number: "10-2016-175765",
    date: "2016.12.21",
    status: "Filed",
  },
  {
    id: "pat-14",
    title:
      "지연 허용 센서 네트워크에서 이동 싱크 노드와의 접속을 제어하는 방법",
    number: "10-2015-0187889",
    date: "2015.12.28",
    status: "Filed",
  },
  {
    id: "pat-15",
    title:
      "무선 네트워크에서의 링크 품질 기반 데이터 전송 방법 및 장치",
    number: "10-1269234",
    date: "2013.05.23",
    status: "Registered",
  },
  {
    id: "pat-16",
    title:
      "무선 신체 통신 망에서의 맥 프로토콜을 위한 동적 비경쟁 할당 방법 및 이를 이용한 무선 네트워크 통신 방법",
    number: "10-1211157",
    date: "2012.12.05",
    status: "Registered",
  },
  {
    id: "pat-17",
    title: "센서 노드의 경로 탐색 장치",
    number: "10-1201677",
    date: "2012.11.09",
    status: "Registered",
  },
  {
    id: "pat-18",
    title: "소스 노드의 경로 탐색 방법",
    number: "10-1201678",
    date: "2012.11.09",
    status: "Registered",
  },
  {
    id: "pat-19",
    title:
      "무선 인체 통신망에서 네트워크의 수명 연장과 통신 신뢰성 향상을 위한 라우팅 시스템 및 그에 따른 네트워크 통신 방법",
    number: "10-1146661",
    date: "2012.05.09",
    status: "Registered",
  },
  {
    id: "pat-20",
    title:
      "무선 신체 통신 망에서의 맥 프로토콜 및 이를 이용한 무선 네트워크 통신 방법",
    number: "10-1121048",
    date: "2012.02.21",
    status: "Registered",
  },
  {
    id: "pat-21",
    title:
      "무선 센서 네트워크에서 요구되는 통신 신뢰도를 만족시키기 위한 전송 방법",
    number: "10-1000006",
    date: "2010.12.03",
    status: "Registered",
  },
  {
    id: "pat-22",
    title:
      "비콘 비가용 모드의 저전력 지그비 센서 네트워크 시스템 및 그에 따른 네트워크 통신 방법",
    number: "10-0952229",
    date: "2010.04.02",
    status: "Registered",
  },
  {
    id: "pat-23",
    title:
      "이기종 무선 네트워크 시스템에서의 페이징 방법 및 이를위한 장치",
    number: "10-0893007",
    date: "2009.04.03",
    status: "Registered",
  },
  {
    id: "pat-24",
    title:
      "Non-beacon Mode Zigbee Sensor Network System for Low Power Consumption and Network Communication Method Thereof",
    number: "PCT/KR2009/003064",
    date: "2009.06.08",
    status: "Filed",
  },
];
