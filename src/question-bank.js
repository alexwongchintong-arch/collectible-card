// ===================================================================
// 明星卡人才测评 — 完整题库（160 题）
// ===================================================================
// 每个子维度 8 道题，每次测试随机抽取 4 道
// 正向题 [+] = 同意得高分，反向题 [–] = 同意得低分
// 计分：7 点 Likert → 映射到 0-10 分制
// ===================================================================

const QUESTION_BANK = {

  // ═══════════════════════════════════════════════════════════════
  // A. 动机能量
  // ═══════════════════════════════════════════════════════════════

  '成功愿望': [
    { text: '我会主动给自己设定比上级要求更高的目标。', reverse: false },
    { text: '即使成功的把握不大，只要事情足够重要，我仍然愿意全力以赴。', reverse: false },
    { text: '我常常不满足于已经达成的成绩，会立刻寻找下一个挑战。', reverse: false },
    { text: '同事形容我是一个"不断往前冲"的人。', reverse: false },
    { text: '在完成一项重要任务后，我通常不会停下来庆祝，而是马上投入下一件事。', reverse: false },
    { text: '我对自己的职业生涯有清晰的野心和进取规划。', reverse: false },
    { text: '如果一份工作没有成长空间，即使待遇优厚我也会考虑离开。', reverse: false },
    { text: '我不太在意是否能做到最好，重要的是过程让我感到舒适。', reverse: true },
  ],

  '权力动机': [
    { text: '在跨部门项目中，我会主动争取担任协调者或牵头人的角色。', reverse: false },
    { text: '看到团队方向不明确时，我会有强烈的冲动站出来引导大家。', reverse: false },
    { text: '我享受带领团队攻克难关、达成目标的过程。', reverse: false },
    { text: '对我来说，能够影响一个组织的决策方向比获得个人荣誉更有成就感。', reverse: false },
    { text: '在会议中，我通常是那个推动大家形成决议的人。', reverse: false },
    { text: '我不介意承担领导带来的额外压力和责任。', reverse: false },
    { text: '当团队出现分歧时，我倾向于主动介入并协调各方达成一致。', reverse: false },
    { text: '我更愿意做个执行者——把具体的事情做好，而不是去指挥别人怎么做。', reverse: true },
  ],

  '亲和动机': [
    { text: '我会主动在工作环境中创造与同事交流和建立联系的机会。', reverse: false },
    { text: '午餐时我更愿意和同事一起吃，而不是独自一人。', reverse: false },
    { text: '即使工作繁忙，我也会抽时间维护重要的人际关系。', reverse: false },
    { text: '加入一个新团队后，我会尽快了解每个人并融入集体。', reverse: false },
    { text: '团队聚餐或团建活动对我来说是充电，而不是消耗。', reverse: false },
    { text: '我乐于在工作群聊中分享有趣的内容，维持活跃的互动氛围。', reverse: false },
    { text: '当有同事离职或调岗时，我会主动保持联系。', reverse: false },
    { text: '一个人安安静静地完成工作，对我来说是最理想的状态。', reverse: true },
  ],

  '活力': [
    { text: '即使连续加班几天，我仍然能保持较高的工作效率。', reverse: false },
    { text: '我喜欢同时推进三四个不同的项目，这种多线并行的节奏让我兴奋。', reverse: false },
    { text: '工作日结束后，我通常还有精力去健身、学习或社交。', reverse: false },
    { text: '面对堆满日程的日历，我不会感到焦虑，反而觉得充实。', reverse: false },
    { text: '同事们常说我的精力旺盛得让人羡慕。', reverse: false },
    { text: '短暂休息后我能迅速恢复状态，很少感到一整天都萎靡不振。', reverse: false },
    { text: '在繁忙的项目高峰期，我的干劲反而比平时更足。', reverse: false },
    { text: '我偏爱不被太多任务追赶的从容节奏，一次专注做好一两件事就够了。', reverse: true },
  ],

  // ═══════════════════════════════════════════════════════════════
  // B. 思维决策
  // ═══════════════════════════════════════════════════════════════

  '创新意识': [
    { text: '面对一个反复出现的老问题，我总想试试用新的方式去解决。', reverse: false },
    { text: '我常常对现有的工作流程或方法提出改进建议。', reverse: false },
    { text: '看到别的行业或领域的优秀做法，我会思考能否借鉴到自己的工作中。', reverse: false },
    { text: '我的同事经常说我的点子和想法比别人多。', reverse: false },
    { text: '即使一个方案已经在平稳运行，我仍会思考是否有更好的替代方案。', reverse: false },
    { text: '我对尝试新工具、新软件、新工作方法抱有很高的热情。', reverse: false },
    { text: '在脑暴会议上，我通常是贡献最多创意的那个人。', reverse: false },
    { text: '我倾向于采用已经被验证过的成熟方法，而不是冒险尝试未知的方案。', reverse: true },
  ],

  '洞察性': [
    { text: '在阅读一份复杂的报告时，我能很快识别出数据背后隐藏的趋势。', reverse: false },
    { text: '当项目出问题时，我通常不满足于表面原因，会一层层深挖到根因。', reverse: false },
    { text: '我善于在海量信息中快速提炼出最关键的几个要点。', reverse: false },
    { text: '同事遇到复杂问题来找我讨论时，我常常能帮他们看清问题的本质。', reverse: false },
    { text: '我能敏锐地察觉到一个看似合理的方案中存在的逻辑漏洞。', reverse: false },
    { text: '我看问题时习惯从多个角度切入，而不仅仅是听取第一手信息。', reverse: false },
    { text: '相比别人，我更容易看出不同事件之间的内在关联。', reverse: false },
    { text: '大多数情况下依赖直觉做判断就够了，深究太多反而让事情变复杂。', reverse: true },
  ],

  '理性': [
    { text: '即使某个决定的提出者是我的好友，如果我看到数据不支持，我也会提出质疑。', reverse: false },
    { text: '面对两个方案的选择，我会建立一套客观的评估标准，而不是凭感觉取舍。', reverse: false },
    { text: '在激烈的争论中，我会提醒大家回到事实和数据上，而非被情绪带动。', reverse: false },
    { text: '做重要决策时，我会刻意区分"客观事实"和"个人感受"。', reverse: false },
    { text: '当我的直觉和数据产生冲突时，我会优先选择相信数据。', reverse: false },
    { text: '我在发表意见前，通常会先确认是否有足够的事实依据支撑。', reverse: false },
    { text: '在评审他人工作时，我会用统一的标准对待每一个人。', reverse: false },
    { text: '完全基于数据的决策有时候会忽略重要的"人情因素"。', reverse: true },
  ],

  '决断力': [
    { text: '即使手头的信息只掌握了七八成，我也能拍板决定并推进执行。', reverse: false },
    { text: '做出重要决定后，我不会反复纠结"如果选另一个会不会更好"。', reverse: false },
    { text: '在时间紧迫的情况下，我能在短时间内权衡利弊并做出明确选择。', reverse: false },
    { text: '当团队陷入反复讨论却无法决策时，我会站出来拍板。', reverse: false },
    { text: '我倾向于认为，"快速做出一个不错的决定"比"慢慢找到完美的决定"更有价值。', reverse: false },
    { text: '面对多个看起来都不错的选项，我能果断选定一个并全力投入。', reverse: false },
    { text: '回顾我过往的重大决定，大部分都是在合理时间内完成的。', reverse: false },
    { text: '做重大决策前我通常会反复权衡，有时候需要比预期更长的时间才能最终定下来。', reverse: true },
  ],

  // ═══════════════════════════════════════════════════════════════
  // C. 情感成熟度
  // ═══════════════════════════════════════════════════════════════

  '乐观': [
    { text: '当一个大项目出现意外变故时，我会首先关注其中可能带来的新机会。', reverse: false },
    { text: '面对一个不确定的结果，我倾向于相信最终会朝着好的方向发展。', reverse: false },
    { text: '即使团队士气低落的时候，我也能给大家注入积极的能量。', reverse: false },
    { text: '同事说我是一个"遇到什么事都能看到积极面"的人。', reverse: false },
    { text: '经历失败后，我会很快把注意力转移到"下一步怎么办"上，而不是沉溺于沮丧。', reverse: false },
    { text: '我对公司或行业未来的前景，总体上持乐观判断。', reverse: false },
    { text: '一个被取消的项目，在我看来可能是另一个更好机会的起点。', reverse: false },
    { text: '接手一个新任务时，我往往会先想清楚所有可能失败的原因。', reverse: true },
  ],

  '抗压性': [
    { text: '在距离截止时间只剩一天的时候，我仍能有条不紊地完成高质量的工作。', reverse: false },
    { text: '面对大老板的突然质疑或批评，我不会长时间陷在情绪里影响后续工作。', reverse: false },
    { text: '高风险、高压力的项目反而能让我发挥出最佳水平。', reverse: false },
    { text: '曾经有多次，在大家都觉得撑不住的时候，我依然保持了稳定的状态。', reverse: false },
    { text: '同事形容我是一个"天塌下来也能正常吃饭睡觉"的人。', reverse: false },
    { text: '面对紧张的KPI和业绩压力，我的工作表现不会明显受影响。', reverse: false },
    { text: '我有自己的一套解压方法，能在高压时期保护好自己的身心状态。', reverse: false },
    { text: '重要汇报或演讲的前夜，我通常睡不好，甚至会影响到第二天的发挥。', reverse: true },
  ],

  '情绪稳定性': [
    { text: '无论工作环境如何变化，我的情绪状态都维持在一个相对平稳的水平。', reverse: false },
    { text: '遇到不愉快的事情时，我能在几分钟内调整好自己的情绪。', reverse: false },
    { text: '同事们很难从我脸上的表情判断我此刻心情是好是坏。', reverse: false },
    { text: '即使面对令人恼火的同事或客户，我依然能保持冷静和理性的沟通。', reverse: false },
    { text: '近半年来，我很少在工作中有过明显的情绪爆发或崩溃时刻。', reverse: false },
    { text: '我的工作表现很少受到当天心情好坏的影响。', reverse: false },
    { text: '面对突如其来的坏消息，我通常能保持镇定，先处理问题再处理情绪。', reverse: false },
    { text: '有时候一点小事的不顺心就能让我一整个上午都心情烦躁。', reverse: true },
  ],

  '适应性': [
    { text: '公司突然调整战略方向时，我能迅速调整自己的工作重心。', reverse: false },
    { text: '面对不同风格的上司，我会灵活调整自己的沟通和工作方式。', reverse: false },
    { text: '被临时调到一个完全陌生的业务领域时，我能较快上手并适应。', reverse: false },
    { text: '对于突然取消或大幅变更的计划，我通常不会抱怨太多，直接调整就好。', reverse: false },
    { text: '过去两年中我经历过至少一次重大的岗位或职责变化，并且适应得不错。', reverse: false },
    { text: '在不同的团队文化和工作节奏中，我都能找到适合自己的生存方式。', reverse: false },
    { text: '我不需要很长的"过渡期"，进入新环境后很快就能产出结果。', reverse: false },
    { text: '我更喜欢保持一贯的工作方式和节奏，不希望被频繁地要求调整和改变。', reverse: true },
  ],

  // ═══════════════════════════════════════════════════════════════
  // D. 人际互动
  // ═══════════════════════════════════════════════════════════════

  '社交自信': [
    { text: '参加一个全是陌生人的行业交流会时，我能自然地融入并展开交谈。', reverse: false },
    { text: '在公司全员大会上被点名发言，我并不会感到特别紧张。', reverse: false },
    { text: '第一次见重要客户或高层领导时，我能保持从容和自然的表达。', reverse: false },
    { text: '当需要在一群人面前即兴发言时，我基本不需要提前准备就能流畅表达。', reverse: false },
    { text: '在商务饭局或酒会上，我不会觉得尴尬或不知该说什么。', reverse: false },
    { text: '同事们说我是一个在任何场合都能落落大方、应对自如的人。', reverse: false },
    { text: '我主动结识行业内的新朋友，不会因为对方级别高而退缩。', reverse: false },
    { text: '让我在一大群人面前做自我介绍，我会感到局促和紧张。', reverse: true },
  ],

  '影响意愿': [
    { text: '在讨论方案时，如果我认为自己的思路更优，我会尽力说服团队采纳。', reverse: false },
    { text: '看到同事在走弯路，我通常会主动给出自己的建议和看法。', reverse: false },
    { text: '我曾多次成功地说服上级或客户改变他们的原有立场。', reverse: false },
    { text: '我发现一个好东西（书、工具、方法），会忍不住想推荐给身边所有人。', reverse: false },
    { text: '在我的推动下，团队至少有一次做出了与初始倾向不同的决策。', reverse: false },
    { text: '我对"销售"这个词不排斥——把自己的想法成功推销出去，这个过程让我很享受。', reverse: false },
    { text: '即使面对阻力，我也会坚持推动我认为正确的方向。', reverse: false },
    { text: '每个人都有权保留自己的观点，我不认为应该花太多时间去改变别人。', reverse: true },
  ],

  '同理心': [
    { text: '开会时我能很快感知到房间里谁在情绪上已经有了抵触，即使对方没有说出来。', reverse: false },
    { text: '在做会影响他人的决策时，我会花时间想象"如果我是对方，会怎么想"。', reverse: false },
    { text: '同事情绪低落时，我通常不需要他们明说就能察觉，并给予适当的关心。', reverse: false },
    { text: '当同事向我倾诉烦恼时，我不会急着给建议，而是先让他们感到被理解。', reverse: false },
    { text: '在协商中，我能准确洞察到对方的真实顾虑和核心诉求。', reverse: false },
    { text: '即使对方表达得很含蓄，我也能捕捉到他们没说出来的那层意思。', reverse: false },
    { text: '我的上级或同事曾说过我"很善解人意"或"很会替别人着想"。', reverse: false },
    { text: '我倾向于就事论事，不太关注对方在这件事上的情绪感受。', reverse: true },
  ],

  '支持性': [
    { text: '同事被一个问题困住时，即使不是我分内的事，我也会主动过去帮忙。', reverse: false },
    { text: '带教新人或帮助后辈成长，这个过程会给我带来很大的满足感。', reverse: false },
    { text: '看到团队成员承担了过多的工作量，我会主动询问是否需要分担。', reverse: false },
    { text: '当同事的提议需要人站台时，只要我认为合理，我会公开表达支持。', reverse: false },
    { text: '我曾多次在非工作时间帮同事处理紧急问题。', reverse: false },
    { text: '当团队整体紧张时，我会主动做一些后勤或协调类的"杂活"来缓解大家压力。', reverse: false },
    { text: '别人说我是一个"可以信赖和依靠"的队友。', reverse: false },
    { text: '每个人都有自己的职责范围，没必要为别人的工作操心太多。', reverse: true },
  ],

  // ═══════════════════════════════════════════════════════════════
  // E. 任务执行
  // ═══════════════════════════════════════════════════════════════

  '条理性': [
    { text: '每天开始工作前，我会先列出当天的任务清单并按优先级排序。', reverse: false },
    { text: '我的电脑文件夹和邮箱都有清晰的分类体系，找东西很少超过一分钟。', reverse: false },
    { text: '接手一个大项目时，我的第一反应是拆解任务并制定分阶段计划。', reverse: false },
    { text: '同事借用我的文档或文件时，通常会惊讶于其中的井井有条。', reverse: false },
    { text: '我习惯用项目管理工具或任务清单来追踪每一项工作的进展。', reverse: false },
    { text: '即使是临时的会议，我也会提前准备一个简要的议程或要点。', reverse: false },
    { text: '在同时处理多个任务时，我总能清楚地知道每件事推进到了哪一步。', reverse: false },
    { text: '我不喜欢花太多时间在规划上——直接开始做，边做边调整才是最有效的方式。', reverse: true },
  ],

  '审慎': [
    { text: '在给重要客户或高层发送邮件前，我会反复检查措辞、数据和附件。', reverse: false },
    { text: '做出关键决策之前，我习惯先穷尽所有可能存在的风险点。', reverse: false },
    { text: '同事说我是一个"做事让人放心"的人，因为我会把方方面面都考虑到。', reverse: false },
    { text: '面对一个看似完美的方案时，我会刻意寻找其中的疏漏和潜在问题。', reverse: false },
    { text: '我倾向于三思而后行——宁可慢一点，也要确保方向正确。', reverse: false },
    { text: '在签署合同或做出承诺之前，我会逐条确认每一个条款的细节。', reverse: false },
    { text: '过去一年中，我负责的重要事项几乎没有因为疏漏导致过重大失误。', reverse: false },
    { text: '想得太多反而会错过机会——很多时候快速行动比周密计划更重要。', reverse: true },
  ],

  '责任意识': [
    { text: '即使没有任何人监督，我也始终会按照自己承诺的标准完成工作。', reverse: false },
    { text: '当项目出现问题时，我不会急着找外部原因，而是先审视自己可以做得更好的地方。', reverse: false },
    { text: '我曾多次主动承担不属于自己职责范围但团队需要的任务。', reverse: false },
    { text: '如果我答应周五之前交付，我会想尽一切办法确保周五之前交出去。', reverse: false },
    { text: '看到团队某项工作有漏洞需要补，即使不是我的职责我也会主动提出来。', reverse: false },
    { text: '维护公司的规章制度对我来说是一种自觉行为，而不是被迫遵守。', reverse: false },
    { text: '我曾因为对工作结果不满意，主动花额外的时间重新做了一遍。', reverse: false },
    { text: '过于强调"负责"有时候会让人不敢尝试有风险但有价值的事情。', reverse: true },
  ],

  '意志力': [
    { text: '面对一个需要半年以上才能见效的长期项目，我能保持持续的动力和投入。', reverse: false },
    { text: '在做重复性高、单调枯燥的工作时，我仍然能保持专注，不降低标准。', reverse: false },
    { text: '过去遇到重大障碍时，我选择的都是"找到替代方案继续前进"，而非退缩。', reverse: false },
    { text: '我有一个坚持了超过一年的习惯（如健身、阅读、学习），几乎没有中断过。', reverse: false },
    { text: '当同事已经放弃时，我往往还在坚持寻找解决方案。', reverse: false },
    { text: '即使屡次被拒绝或碰壁，我仍会调整策略继续尝试，直到达成目标。', reverse: false },
    { text: '回顾我的职业经历，我做过好几件"一开始很难但最终做成了"的事情。', reverse: false },
    { text: '我立下过不少目标，但其中有不少坚持了一段时间后就不了了之了。', reverse: true },
  ],
};

// 验证：每个子维度恰好 8 道题
const QUESTION_POOL_SIZE = 8;
const QUESTIONS_PER_DIM_PER_TEST = 4;


// 英文版题库（与 QUESTION_BANK 键名、题序、reverse 完全对齐；text 为英文）
const QUESTION_BANK_EN = {

  // A. Motivation & Energy

  '成功愿望': [
    { text: 'I proactively set goals for myself that are higher than what my manager requires.', reverse: false },
    { text: 'Even when the odds of success are low, I am willing to give my all if the task matters enough.', reverse: false },
    { text: 'I am often not satisfied with what I have already achieved and immediately look for the next challenge.', reverse: false },
    { text: 'My colleagues describe me as someone who is "always pushing forward."', reverse: false },
    { text: 'After completing an important task, I usually dive straight into the next thing instead of pausing to celebrate.', reverse: false },
    { text: 'I have a clear ambition and an upward plan for my career.', reverse: false },
    { text: 'If a job offers no room to grow, I would consider leaving even if the pay is generous.', reverse: false },
    { text: 'I do not care much about being the best; what matters to me is that the process feels comfortable.', reverse: true },
  ],

  '权力动机': [
    { text: 'In cross-department projects, I proactively seek the role of coordinator or lead.', reverse: false },
    { text: 'When the team lacks a clear direction, I feel a strong urge to step up and guide everyone.', reverse: false },
    { text: 'I enjoy leading a team through tough challenges to reach a goal.', reverse: false },
    { text: 'For me, being able to influence an organization\'s decisions is more rewarding than receiving personal honors.', reverse: false },
    { text: 'In meetings, I am usually the one who pushes the group toward a decision.', reverse: false },
    { text: 'I do not mind the extra pressure and responsibility that come with leadership.', reverse: false },
    { text: 'When the team is divided, I tend to step in and help the different sides reach agreement.', reverse: false },
    { text: 'I would rather be an executor—getting concrete things done—than direct how others should work.', reverse: true },
  ],

  '亲和动机': [
    { text: 'I proactively create opportunities to connect and build relationships with colleagues at work.', reverse: false },
    { text: 'At lunchtime, I prefer eating with colleagues rather than alone.', reverse: false },
    { text: 'Even when work is busy, I make time to maintain important relationships.', reverse: false },
    { text: 'After joining a new team, I get to know everyone and blend into the group as quickly as I can.', reverse: false },
    { text: 'Team dinners and team-building activities recharge me rather than drain me.', reverse: false },
    { text: 'I enjoy sharing interesting things in work group chats to keep the interaction lively.', reverse: false },
    { text: 'When a colleague leaves the company or transfers to another role, I make a point of staying in touch.', reverse: false },
    { text: 'Working quietly on my own is the ideal state for me.', reverse: true },
  ],

  '活力': [
    { text: 'Even after several days of overtime, I can still maintain high work efficiency.', reverse: false },
    { text: 'I enjoy driving three or four different projects at once; this parallel pace excites me.', reverse: false },
    { text: 'After the workday ends, I usually still have energy for exercise, learning, or socializing.', reverse: false },
    { text: 'A calendar packed with commitments does not make me anxious—it makes me feel fulfilled.', reverse: false },
    { text: 'My colleagues often say they envy how much energy I have.', reverse: false },
    { text: 'A short break is enough for me to bounce back quickly; I rarely feel sluggish for a whole day.', reverse: false },
    { text: 'During busy project peaks, my drive is actually stronger than usual.', reverse: false },
    { text: 'I prefer an unhurried pace without too many tasks chasing me—focusing on one or two things at a time is enough.', reverse: true },
  ],

  // B. Thinking & Decision-Making

  '创新意识': [
    { text: 'Faced with an old, recurring problem, I always want to try solving it in a new way.', reverse: false },
    { text: 'I often propose improvements to existing workflows or methods.', reverse: false },
    { text: 'When I see excellent practices in other industries or fields, I think about whether I can adapt them to my own work.', reverse: false },
    { text: 'My colleagues often say I have more ideas than others.', reverse: false },
    { text: 'Even when a solution is already running smoothly, I still consider whether a better alternative exists.', reverse: false },
    { text: 'I am highly enthusiastic about trying new tools, new software, and new ways of working.', reverse: false },
    { text: 'In brainstorming sessions, I am usually the one contributing the most ideas.', reverse: false },
    { text: 'I prefer proven, established methods over taking a risk on untested solutions.', reverse: true },
  ],

  '洞察性': [
    { text: 'When reading a complex report, I can quickly identify the trends hidden behind the data.', reverse: false },
    { text: 'When a project runs into trouble, I am not satisfied with surface explanations—I dig layer by layer to the root cause.', reverse: false },
    { text: 'I am good at quickly distilling the few most critical points from a sea of information.', reverse: false },
    { text: 'When colleagues bring me complex problems to discuss, I can often help them see the essence of the issue.', reverse: false },
    { text: 'I can sharply spot the logical flaws in a plan that looks reasonable on the surface.', reverse: false },
    { text: 'I am used to examining problems from multiple angles rather than relying only on first-hand accounts.', reverse: false },
    { text: 'Compared with others, I more easily see the underlying connections between different events.', reverse: false },
    { text: 'In most cases, relying on intuition is enough—digging too deep only complicates things.', reverse: true },
  ],

  '理性': [
    { text: 'Even if a proposal comes from a close friend, I will question it when I see the data does not support it.', reverse: false },
    { text: 'When choosing between two options, I build an objective set of evaluation criteria rather than going by feel.', reverse: false },
    { text: 'In heated debates, I bring everyone back to the facts and data instead of letting emotions take over.', reverse: false },
    { text: 'When making important decisions, I deliberately separate "objective facts" from "personal feelings."', reverse: false },
    { text: 'When my intuition conflicts with the data, I choose to trust the data first.', reverse: false },
    { text: 'Before voicing an opinion, I usually check that there is enough factual evidence to back it up.', reverse: false },
    { text: 'When reviewing others\' work, I apply the same standard to everyone.', reverse: false },
    { text: 'Decisions based entirely on data can sometimes overlook important human factors.', reverse: true },
  ],

  '决断力': [
    { text: 'Even with only 70–80% of the information in hand, I can make the call and move execution forward.', reverse: false },
    { text: 'After making an important decision, I do not keep agonizing over whether the other option would have been better.', reverse: false },
    { text: 'Under time pressure, I can weigh the pros and cons quickly and make a clear choice.', reverse: false },
    { text: 'When the team keeps discussing without deciding, I step up and make the call.', reverse: false },
    { text: 'I believe a good decision made fast is more valuable than a perfect decision reached slowly.', reverse: false },
    { text: 'Faced with several options that all look good, I can decisively pick one and commit fully to it.', reverse: false },
    { text: 'Looking back, most of my major decisions were made within a reasonable amount of time.', reverse: false },
    { text: 'Before making a major decision, I usually weigh things over and over, and sometimes it takes longer than expected to finally settle.', reverse: true },
  ],

  // C. Emotional Maturity

  '乐观': [
    { text: 'When a major project hits an unexpected setback, I first look for the new opportunities it might bring.', reverse: false },
    { text: 'Facing an uncertain outcome, I tend to believe things will turn out for the better.', reverse: false },
    { text: 'Even when team morale is low, I can inject positive energy into the group.', reverse: false },
    { text: 'My colleagues say I am someone who "sees the bright side of everything."', reverse: false },
    { text: 'After a failure, I quickly shift my attention to "what\'s next" rather than dwelling on the frustration.', reverse: false },
    { text: 'Overall, I hold an optimistic view of the future of my company and industry.', reverse: false },
    { text: 'To me, a cancelled project may well be the starting point of a better opportunity.', reverse: false },
    { text: 'When taking on a new task, I tend to first think through all the reasons it might fail.', reverse: true },
  ],

  '抗压性': [
    { text: 'With only one day left before a deadline, I can still deliver high-quality work in an orderly way.', reverse: false },
    { text: 'When a senior executive suddenly challenges or criticizes me, I do not stay stuck in the emotion and let it affect my work afterward.', reverse: false },
    { text: 'High-stakes, high-pressure projects actually bring out my best performance.', reverse: false },
    { text: 'On multiple occasions, I kept my composure when everyone around me felt they could not hold on.', reverse: false },
    { text: 'My colleagues describe me as someone who "eats and sleeps normally even when the sky is falling."', reverse: false },
    { text: 'Under intense KPI and performance pressure, my work performance is not noticeably affected.', reverse: false },
    { text: 'I have my own ways of relieving stress that protect my physical and mental state during high-pressure periods.', reverse: false },
    { text: 'The night before an important presentation or talk, I usually sleep poorly, and it can even hurt my performance the next day.', reverse: true },
  ],

  '情绪稳定性': [
    { text: 'No matter how the work environment changes, my emotional state stays relatively steady.', reverse: false },
    { text: 'When something unpleasant happens, I can regain my composure within a few minutes.', reverse: false },
    { text: 'It is hard for colleagues to tell from my expression whether I am in a good or bad mood.', reverse: false },
    { text: 'Even when dealing with infuriating colleagues or clients, I can keep my communication calm and rational.', reverse: false },
    { text: 'Over the past six months, I have rarely had any noticeable emotional outburst or breakdown at work.', reverse: false },
    { text: 'My work performance is rarely affected by whether I happen to be in a good mood that day.', reverse: false },
    { text: 'Faced with sudden bad news, I usually stay composed and deal with the problem before processing my emotions.', reverse: false },
    { text: 'Sometimes one small annoyance can leave me irritable for an entire morning.', reverse: true },
  ],

  '适应性': [
    { text: 'When the company suddenly shifts its strategic direction, I can quickly refocus my work accordingly.', reverse: false },
    { text: 'With managers of different styles, I flexibly adjust how I communicate and work.', reverse: false },
    { text: 'When I am suddenly transferred to a completely unfamiliar business area, I get up to speed and adapt fairly quickly.', reverse: false },
    { text: 'When a plan is suddenly cancelled or changed significantly, I usually just adjust without complaining much.', reverse: false },
    { text: 'In the past two years, I have been through at least one major change in role or responsibilities, and I adapted well.', reverse: false },
    { text: 'Across different team cultures and work rhythms, I can always find a way to thrive.', reverse: false },
    { text: 'I do not need a long "adjustment period"—I start producing results quickly after entering a new environment.', reverse: false },
    { text: 'I prefer to keep a consistent way and pace of working, and I do not like being asked to adjust and change frequently.', reverse: true },
  ],

  // D. Interpersonal Interaction

  '社交自信': [
    { text: 'At an industry networking event full of strangers, I can naturally blend in and start conversations.', reverse: false },
    { text: 'Being called on to speak at a company-wide meeting does not make me particularly nervous.', reverse: false },
    { text: 'When meeting important clients or senior leaders for the first time, I stay composed and express myself naturally.', reverse: false },
    { text: 'When I need to speak off the cuff in front of a group, I can express myself fluently with little preparation.', reverse: false },
    { text: 'At business dinners or cocktail parties, I do not feel awkward or at a loss for words.', reverse: false },
    { text: 'My colleagues say I carry myself with ease and handle any occasion gracefully.', reverse: false },
    { text: 'I proactively make new connections in my industry and am not intimidated by someone\'s senior rank.', reverse: false },
    { text: 'Introducing myself in front of a large group of people makes me feel uneasy and nervous.', reverse: true },
  ],

  '影响意愿': [
    { text: 'When discussing a plan, if I believe my approach is better, I do my best to persuade the team to adopt it.', reverse: false },
    { text: 'When I see a colleague going down the wrong path, I usually offer my suggestions and views proactively.', reverse: false },
    { text: 'I have successfully persuaded managers or clients to change their original positions on multiple occasions.', reverse: false },
    { text: 'When I discover something great—a book, a tool, a method—I cannot help recommending it to everyone around me.', reverse: false },
    { text: 'At least once, my advocacy led the team to a decision different from its initial inclination.', reverse: false },
    { text: 'I am not put off by the word "sales"—successfully selling my ideas is a process I genuinely enjoy.', reverse: false },
    { text: 'Even in the face of resistance, I keep pushing in the direction I believe is right.', reverse: false },
    { text: 'Everyone is entitled to their own view; I do not think it is worth spending much time trying to change others.', reverse: true },
  ],

  '同理心': [
    { text: 'In a meeting, I can quickly sense who in the room has become emotionally resistant, even if they have not said so.', reverse: false },
    { text: 'Before making a decision that affects others, I take time to imagine "how would I feel if I were in their shoes."', reverse: false },
    { text: 'When a colleague is feeling down, I usually notice without being told and offer appropriate care.', reverse: false },
    { text: 'When a colleague confides their troubles in me, I do not rush to give advice—I first make them feel understood.', reverse: false },
    { text: 'In negotiations, I can accurately perceive the other party\'s real concerns and core needs.', reverse: false },
    { text: 'Even when people express themselves indirectly, I can pick up the meaning they have left unsaid.', reverse: false },
    { text: 'My managers or colleagues have said that I am "very understanding" or "very considerate of others."', reverse: false },
    { text: 'I tend to stick to the matter at hand and do not pay much attention to how the other person feels about it.', reverse: true },
  ],

  '支持性': [
    { text: 'When a colleague is stuck on a problem, I proactively go help even if it is not part of my job.', reverse: false },
    { text: 'Mentoring newcomers and helping junior colleagues grow gives me great satisfaction.', reverse: false },
    { text: 'When I see a team member overloaded with work, I proactively ask whether they need help sharing the load.', reverse: false },
    { text: 'When a colleague\'s proposal needs backing, I voice my support publicly as long as I think it is sound.', reverse: false },
    { text: 'I have helped colleagues handle urgent issues outside of working hours on multiple occasions.', reverse: false },
    { text: 'When the team is stretched thin, I proactively take on logistical or coordination "chores" to ease the pressure on everyone.', reverse: false },
    { text: 'People say I am a teammate they "can trust and rely on."', reverse: false },
    { text: 'Everyone has their own scope of responsibility; there is no need to worry too much about other people\'s work.', reverse: true },
  ],

  // E. Task Execution

  '条理性': [
    { text: 'Before starting work each day, I list my tasks for the day and prioritize them.', reverse: false },
    { text: 'My computer folders and inbox have a clear filing system; it rarely takes me more than a minute to find anything.', reverse: false },
    { text: 'When I take on a large project, my first reaction is to break it down and make a phased plan.', reverse: false },
    { text: 'When colleagues borrow my documents or files, they are usually surprised by how well organized everything is.', reverse: false },
    { text: 'I make a habit of using project management tools or task lists to track the progress of every piece of work.', reverse: false },
    { text: 'Even for an ad hoc meeting, I prepare a brief agenda or key points in advance.', reverse: false },
    { text: 'When handling multiple tasks at once, I always know exactly where each one stands.', reverse: false },
    { text: 'I do not like spending too much time on planning—jumping straight in and adjusting as I go is the most effective way.', reverse: true },
  ],

  '审慎': [
    { text: 'Before sending an email to an important client or senior leader, I check the wording, data, and attachments over and over.', reverse: false },
    { text: 'Before making a key decision, I make a habit of exhausting every possible risk.', reverse: false },
    { text: 'My colleagues say I am someone whose work "they can count on," because I think through every aspect.', reverse: false },
    { text: 'Faced with a plan that looks flawless, I deliberately look for oversights and potential problems in it.', reverse: false },
    { text: 'I prefer to think carefully before acting—I would rather be a bit slower than go in the wrong direction.', reverse: false },
    { text: 'Before signing a contract or making a commitment, I confirm the details of every clause, one by one.', reverse: false },
    { text: 'Over the past year, almost none of the important matters I was responsible for suffered a major failure due to oversight.', reverse: false },
    { text: 'Overthinking can make you miss opportunities—acting fast often matters more than careful planning.', reverse: true },
  ],

  '责任意识': [
    { text: 'Even with no one supervising me, I always deliver work to the standard I promised.', reverse: false },
    { text: 'When a project runs into problems, instead of rushing to blame external factors, I first look at what I could have done better.', reverse: false },
    { text: 'I have proactively taken on tasks outside my own responsibilities when the team needed them, on multiple occasions.', reverse: false },
    { text: 'If I promise to deliver by Friday, I will do whatever it takes to make sure it goes out by Friday.', reverse: false },
    { text: 'When I spot a gap in the team\'s work that needs filling, I raise it proactively even if it is not my responsibility.', reverse: false },
    { text: 'Following the company\'s rules and policies is something I do out of conviction, not compulsion.', reverse: false },
    { text: 'I have, more than once, voluntarily spent extra time redoing a piece of work because I was not satisfied with the result.', reverse: false },
    { text: 'Putting too much emphasis on "responsibility" can sometimes make people afraid to try risky but worthwhile things.', reverse: true },
  ],

  '意志力': [
    { text: 'For a long-term project that takes more than six months to show results, I can sustain my motivation and commitment throughout.', reverse: false },
    { text: 'Doing highly repetitive, monotonous work, I can still stay focused without lowering my standards.', reverse: false },
    { text: 'Whenever I hit a major obstacle in the past, I chose to "find an alternative route and keep going" rather than retreat.', reverse: false },
    { text: 'I have a habit (such as exercise, reading, or learning) that I have kept up for over a year with almost no interruption.', reverse: false },
    { text: 'When my colleagues have given up, I am often still looking for a solution.', reverse: false },
    { text: 'Even after being rejected or blocked again and again, I adjust my approach and keep trying until I reach the goal.', reverse: false },
    { text: 'Looking back at my career, I have accomplished several things that "looked very hard at first but got done in the end."', reverse: false },
    { text: 'I have set quite a few goals, but many of them fizzled out after a while.', reverse: true },
  ],
};
