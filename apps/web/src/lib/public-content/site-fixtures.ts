import type { SiteSettingsView } from '@/types/site-content'

export const siteSettingsFixture: SiteSettingsView = {
  home: {
    eyebrow: 'HKU-PKU EMBA 8A-194',
    title: '港大-北大 EMBA 8A-194 班级档案馆',
    summary:
      '这是 HKU-PKU EMBA 8A 班级的数字档案馆。把零散的活动、照片、文章与人物，整理成可被检索、可被传阅、可长期沉淀的一卷。',
    stats: [
      { value: '35', label: '同学 / Members' },
      { value: '3', label: '归档活动 / Activities' },
      { value: '82', label: '公开照片 / Photos' },
      { value: '6', label: '影像视频 / Films' }
    ],
    featuredActivitySlugs: ['hku-charity', 'gobi21', 'chunxu'],
    featuredPersonIds: ['p001', 'p002', 'p003']
  },
  about: {
    eyebrow: 'Class Profile',
    title: '班级介绍',
    subtitle: '8A-194 班不只在课堂里相遇，也在一次次需要彼此的时候站到一起。',
    summary:
      '2025 年秋入学，2027 年毕业。35 位同学由港大与北大联合培养；「8A」是港大编制，「194」是北大编制，并非班级人数。',
    heroImage: undefined,
    highlights: [
      { value: '35 位', label: '实际班级人数' },
      { value: '47 人', label: '人物：同学、嘉宾、教授/导师' },
      { value: '3 卷', label: '当前活动归档' }
    ],
    sections: [
      {
        id: 'positioning',
        heading: '这个班级最值得被看见的地方',
        paragraphs: [
          '8A-194 班不只是一个课堂里的学习共同体，也是一群愿意在长线行动里彼此托举的人。戈21 专题让这种气质被非常鲜明地看见：有人组织，有人跟跑，有人捐赠，有人把大家再一次聚拢起来。',
          '把这些内容放在一起，不是为了做一份漂亮的活动清单，而是为了让后来打开页面的人能看到：这个班级如何回应一件事，如何彼此支持，又如何把一次行动变成共同记忆。'
        ]
      },
      {
        id: 'community',
        heading: '为什么要把这些瞬间留下来',
        paragraphs: [
          '许多珍贵瞬间原本会散落在朋友圈、聊天记录和公众号推文里。把它们重新放回同一个地方，老同学回来时能想起当时的声音，新朋友也能理解这群人为什么会走到一起。',
          '当一篇关于戈21 的推文、一组训练照片和一张公益支持海报在这里重新相遇，班级精神就不再只是一句介绍，而是一段可以被看见、被理解、被继续讲述的故事。'
        ]
      }
    ]
  },
  contact: {
    eyebrow: 'Contact',
    title: '联系 / Contact',
    summary:
      '同班同学、来访嘉宾、合作机构皆可。我们读每一封信，并由编辑部 7 日内回复。',
    primaryEmail: 'archive@hkupku8a194.com',
    officeHours: '工作日 10:00 - 18:00',
    locationLabel: '上海 / 香港 / 北京相关活动场域',
    newsletterNote: '提交后会打开你的邮件客户端，请确认内容后发送。网站不会直接保存你的邮箱。',
    applyHref: 'mailto:archive@hkupku8a194.com',
    channels: [
      {
        id: 'contact-email',
        label: '联系邮箱',
        value: 'archive@hkupku8a194.com',
        href: 'mailto:archive@hkupku8a194.com'
      },
      {
        id: 'wechat-channel',
        label: '公众号',
        value: '8A-194 班公开记录'
      },
      {
        id: 'cooperation',
        label: '合作方向',
        value: '嘉宾分享 / 班级交流 / 内容联动'
      }
    ]
  },
  seo: {
    siteName: '港大-北大 EMBA 8A-194 班级档案馆',
    defaultTitle: '港大-北大 EMBA 8A-194 班级档案馆',
    defaultDescription: '把零散的活动记忆，整理成可浏览、可传播、可长期沉淀的档案。',
    keywords: ['EMBA', '8A-194', '班级活动', '活动纪要', '班级档案', '人物嘉宾', '精彩视频'],
    footerNote: '把零散的活动记忆，整理成可浏览、可传播、可长期沉淀的档案。'
  }
}
