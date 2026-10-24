// Generated from resume-current-data.json and site-config.json. Run sync-content.mjs to update.
window.RESUME = {
  "name": "耿锐",
  "role": "",
  "phone": "18841500711",
  "email": "rg2466828390@gmail.com",
  "github": "https://github.com/Rand0MGG",
  "githubLabel": "github.com/Rand0MGG",
  "portfolio": "https://rand0mgg.github.io/",
  "portfolioLabel": "rand0mgg.github.io",
  "englishName": "Rui Geng",
  "handle": "ruigeng",
  "introduction": "香港城市大学人工智能硕士在读。做能读懂课程材料的 Agent，也做从模型实验到实际应用的完整项目。",
  "pdf": "./assets/Rui-Geng-Resume.pdf",
  "education": [
    {
      "school": "香港城市大学",
      "degree": "人工智能 · 硕士研究生",
      "period": "2026.09 - 至今",
      "detail": ""
    },
    {
      "school": "北京邮电大学",
      "degree": "计算机科学与技术 · 本科",
      "period": "2022.09 - 2026.07",
      "detail": "2022-2023 学年三等奖学金　｜　IELTS 6.5"
    }
  ],
  "internship": {
    "company": "北京蓝色光标数字传媒科技有限公司",
    "team": "蓝标传媒数据平台组",
    "role": "实习生",
    "period": "2026.06 - 2026.07",
    "bullets": [
      "费用接入：参与 BMC 企业 AI 服务管控平台开发，接入多模态服务消费记录，支持费用统一归集。",
      "查询与归属：参与部门费用查询，补齐历史记录的用户与部门归属，支持使用明细与费用统计展示。",
      "对账与修复：参与费用明细与汇总核对，排查遗漏、重复和归属缺失，配合历史数据补录、重算及验证。"
    ]
  },
  "projects": [
    {
      "id": "agentscribe",
      "description": "课件、课堂讲解和笔记分散，复习时难以快速对照。让 Agent 按问题读取相关材料，并把回答连接回原文。",
      "contribution": "课程问答工具、引用校验与桌面应用集成",
      "highlight": "材料 → 工具 → 引用",
      "highlightNote": "从课堂记录到可核对的回答",
      "presentationBullets": [
        [
          "课程 Agent",
          "基于 Deep Agents 接入课件、转写与笔记读取工具，结合课程上下文回答问题。"
        ],
        [
          "引用核对",
          "逐条校验来源标识与引用原文，支持回到材料核对；引用有效不等于推理一定正确。"
        ],
        [
          "应用集成",
          "接入转写与双语字幕应用，通过独立进程隔离助手，降低云端异常对录音和字幕保存的影响。"
        ]
      ],
      "screenshots": [
        {
          "src": "./assets/agentscribe.png",
          "label": "双语记录",
          "alt": "AgentScribe 紧凑录音界面，展示双语记录与录音控制，使用示例内容",
          "width": 1350,
          "height": 975
        },
        {
          "src": "./assets/agentscribe-dark.png",
          "label": "深色工作区",
          "alt": "AgentScribe 深色工作区，展示课程记录列表与双语字幕，使用示例内容",
          "width": 1920,
          "height": 1260
        }
      ],
      "name": "AgentScribe",
      "label": "课程 Agent 与双语字幕助手",
      "github": "https://github.com/Rand0MGG/agentscribe-local",
      "period": "",
      "tags": [
        "Python",
        "Deep Agents",
        "PySide6"
      ],
      "bullets": [
        [
          "课程 Agent",
          "基于 Deep Agents 开发课程问答助手，调用课件、转写与笔记读取工具，回答课程相关问题。"
        ],
        [
          "回答可追溯",
          "为回答附带材料来源，逐条校验来源标识与引用原文，方便用户核对答案依据。"
        ],
        [
          "应用集成",
          "将 Agent 接入转写与双语字幕应用，独立进程隔离助手，避免云端异常影响录音与字幕保存。"
        ]
      ]
    },
    {
      "id": "vehicle-reid",
      "description": "不同摄像头下，同一辆车的视角和光照会变化，相似车辆又容易混淆。结合整体与局部特征改进识别，并接入以图搜车系统。",
      "contribution": "模型改进、消融实验与在线检索系统开发",
      "highlight": "mAP +2.05 pp",
      "highlightNote": "81.18% → 83.23% · VeRi-776",
      "screenshots": [
        {
          "src": "./assets/vehicle-reid.png",
          "label": "查询与模型",
          "alt": "Vehicle ReID 查询界面，展示车辆图片、M3 模型选择与 Fast / Pro 检索模式",
          "width": 2550,
          "height": 1275
        },
        {
          "src": "./assets/vehicle-reid-results.png",
          "label": "检索结果",
          "alt": "Vehicle ReID 检索结果界面，展示候选车辆排名与相似度",
          "width": 2550,
          "height": 1275
        },
        {
          "src": "./assets/vehicle-reid-monitor.png",
          "label": "运行监控",
          "alt": "Vehicle ReID 后台运行监控界面，展示图库规模与模型特征覆盖状态",
          "width": 2550,
          "height": 1275
        }
      ],
      "name": "Vehicle ReID System",
      "label": "车辆重识别模型与在线检索系统",
      "github": "https://github.com/Rand0MGG/vehicle-reid-system",
      "period": "2025.11 - 2026.05",
      "tags": [
        "PyTorch",
        "FastAPI",
        "Vue 3"
      ],
      "bullets": [
        [
          "以图搜车",
          "开发车辆检索系统，支持图片查询、图库更新和模型切换，检索跨摄像头的同一车辆。"
        ],
        [
          "识别改进",
          "针对外观相似车辆难以区分的问题，结合整体与局部特征改进模型，并通过四组消融实验验证。"
        ],
        [
          "实验结果",
          "VeRi-776 上 mAP 从 81.18% 提升至 83.23%（+2.05 个百分点；seed3/4 均值，未重排序）。"
        ]
      ]
    }
  ],
  "skills": [
    {
      "group": "language / services",
      "label": "编程与服务",
      "items": [
        "Python",
        "Go",
        "FastAPI",
        "Gin",
        "MySQL",
        "Redis",
        "Git",
        "Linux"
      ]
    },
    {
      "group": "tools / agents",
      "label": "AI 应用",
      "items": [
        "Deep Agents",
        "工具调用",
        "引用校验",
        "语音识别与翻译",
        "PySide6"
      ]
    },
    {
      "group": "vision / retrieval",
      "label": "模型与检索",
      "items": [
        "PyTorch",
        "车辆重识别",
        "向量检索",
        "模型评估与消融实验"
      ]
    }
  ],
  "experiment": {
    "dataset": "VeRi-776",
    "protocol": "seed3、seed4 平均 · 无 re-ranking",
    "baseline": {
      "label": "M0 · SBS 基线",
      "map": 81.18,
      "minp": 44.22
    },
    "improved": {
      "label": "M3 · SaGL + 全局 / 局部特征",
      "map": 83.23,
      "minp": 48.99
    }
  },
  "agentExample": {
    "question": "结合第 3 页课件和老师的课堂补充，这次实验应怎样划分数据？笔记里的随机划分方案需要改吗？",
    "sources": [
      {
        "id": "slide-03",
        "name": "课件 · 第 3 页",
        "tool": "读取课件",
        "text": "本次实验使用训练集、验证集和测试集，比例为 70% / 15% / 15%。测试集不参与模型选择。"
      },
      {
        "id": "transcript-12",
        "name": "课堂转写 · 片段 12",
        "tool": "读取转写",
        "text": "这次数据包含同一对象的多次观测，要先按对象分组，再划分数据。同一对象不能同时出现在训练集和测试集。"
      },
      {
        "id": "note-02",
        "name": "笔记 · 第 2 条",
        "tool": "读取笔记",
        "text": "初步方案：打乱全部样本，按 70% / 15% / 15% 随机划分。待核对老师对重复观测的要求。"
      }
    ],
    "answer": "需要修改笔记中的划分方式。课件规定 70% / 15% / 15% 的比例，且测试集不参与模型选择 [1]；老师补充了按对象分组的要求 [2]。因此，应先按对象分组，再尽量满足比例，而不是打乱全部观测后直接切分。笔记中的初步方案 [3] 需补上这一约束。"
  }
};
