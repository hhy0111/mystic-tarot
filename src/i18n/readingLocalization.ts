import type {
  CardDirection,
  CardReadingDetail,
  FortuneCategory,
  ResolvedCardSelection,
  TarotReading
} from "../types/tarot";
import { pickOne, type RandomSource } from "../utils/random";
import { getCardDisplayName, translations, type LanguageCode } from "./translations";

type CategoryCopy = {
  mood: string[];
  scenes: string[];
  actions: string[];
  avoids: string[];
  timing: string[];
  flow: string[];
  colors: string[];
};

type ReadingCopy = {
  directionTone: Record<CardDirection, string>;
  categoryCopy: Record<FortuneCategory, CategoryCopy>;
};

const localizedReadingCopy: Record<Exclude<LanguageCode, "ko">, ReadingCopy> = {
  zh: {
    directionTone: {
      upright: "事情更容易顺着自然节奏推进。",
      reversed: "需要先放慢速度，把模糊的地方确认清楚。"
    },
    categoryCopy: {
      daily: {
        mood: ["先整理再行动的一天", "小变化带来方向感", "适合恢复节奏的日子"],
        scenes: [
          "今天的问题未必很大，但待办事项、消息和心情会一起挤进脑子里。",
          "表面看起来只是普通的一天，实际上你可能正在重新安排自己的节奏。"
        ],
        actions: ["先完成一件小事，让大脑安静下来。", "重要日程和约定再确认一次。", "不要临时增加太多新任务。"],
        avoids: ["不要因为一时情绪改变整天的计划。", "不要把一个小失误放大成整天都不顺。"],
        timing: ["上午适合整理，下午适合执行。", "重要决定先停一下，再看一遍会更稳。"],
        flow: ["从小事开始，今天会慢慢变得清楚。", "留一点空白，节奏反而更顺。"],
        colors: ["深紫色", "月光银", "午夜蓝", "香槟金"]
      },
      love: {
        mood: ["慢慢靠近的心意", "减少误会的对话", "需要轻松接点的关系"],
        scenes: [
          "你可能会很在意对方的回复速度、语气或是否主动联系。",
          "心里有好感，却又担心表达太快会让对方有压力。"
        ],
        actions: ["用轻松的问候试探气氛。", "先看对话的温度，不要只看回复速度。", "想靠近时，用小邀请代替沉重表达。"],
        avoids: ["不要用试探或催促来确认对方心意。", "不要在没有确认前独自下结论。"],
        timing: ["白天或傍晚的轻松对话比深夜情绪化表达更适合。", "今天不必急着给关系定性。"],
        flow: ["温柔的确认会比强烈证明更有效。", "关系要先对齐速度，再谈下一步。"],
        colors: ["玫瑰粉", "酒红紫", "薰衣草", "柔金色"]
      },
      money: {
        mood: ["检查小支出的时机", "现实稳定更重要", "重新平衡金钱流向"],
        scenes: [
          "钱的压力可能不是来自一次大事，而是很多小支出累积起来。",
          "想买的东西和需要节省的想法同时出现，让你在结账前犹豫。"
        ],
        actions: ["先看最近一周的消费记录。", "想买的东西先放进清单，明天再判断。", "找出一个可以减少的固定支出。"],
        avoids: ["不要在不确定时做大额消费。", "不要因为焦虑一次性处理太多金钱决定。"],
        timing: ["付款或签约前再比较一次。", "今天发现的支出问题，本周内整理最有效。"],
        flow: ["先堵住小漏洞，财运才会稳。", "现实的界限比乐观的猜测更有用。"],
        colors: ["古金色", "祖母绿", "深绿色", "铜色"]
      },
      work: {
        mood: ["找回优先级的时机", "小成果带来推进力", "需要确认工作范围"],
        scenes: [
          "不是能力不够，而是任务散开后压力变大。",
          "你可能想快点做出成果，却担心返工而迟迟无法推进。"
        ],
        actions: ["先确定今天最急的一件事。", "开始前确认对方想要的结果形式。", "做出一个能被确认的小成果。"],
        avoids: ["不要未经确认就扩大责任范围。", "不要只追求速度而留下大量返工。"],
        timing: ["上午整理优先级，下午共享结果更顺。", "需要回复的事情今天先给出简短确认。"],
        flow: ["范围越清楚，压力越小。", "先交付可确认的东西，再提升完成度。"],
        colors: ["海军蓝", "钢蓝色", "炭灰色", "金色"]
      },
      relationship: {
        mood: ["需要温和确认的关系", "适合调整距离", "语言温度很重要"],
        scenes: [
          "别人一句话可能让你反复琢磨，对方却未必有同样的重量。",
          "你既想维持关系，也不想一直压下自己的感受。"
        ],
        actions: ["用简短问题确认对方的意思。", "先听完对方的话，再表达感受。", "需要界限时，用柔和但清楚的方式说出来。"],
        avoids: ["不要先假设对方带着恶意。", "不要把委屈累积到最后一次性爆发。"],
        timing: ["敏感话题选在双方都有余裕的时候说。", "今天没解开的关系，隔一天可能更柔和。"],
        flow: ["确认比猜测更能保护关系。", "距离和表达方式可以重新调整。"],
        colors: ["丁香紫", "薄荷色", "柔金色", "天空蓝"]
      },
      choice: {
        mood: ["需要建立标准的选择", "适合整理选项", "寻找能承担的方向"],
        scenes: [
          "真正重要的不是哪边看起来更好，而是选了之后你能否承担。",
          "心里偏向一边，现实条件却让你犹豫。"
        ],
        actions: ["写下最不想失去的一个标准。", "把今天必须决定和可以延后的事分开。", "比较每个选项要花的时间和成本。"],
        avoids: ["不要等所有条件完美才开始行动。", "不要只看优点而忽略责任。"],
        timing: ["今天更适合整理标准，而不是强行定案。", "先处理条件明确的选择。"],
        flow: ["先决定放下什么，答案会更清楚。", "心意和现实之间要找交集。"],
        colors: ["靛蓝", "白金色", "蛋白石色", "黑紫色"]
      },
      lotto: {
        mood: ["牌面留下的今日数字", "轻松玩的幸运号码", "三张牌给出的数字组合"],
        scenes: [
          "号码会带来期待感，但也容易让人把每个数字都看得太重。",
          "这次解读更像把牌面象征转成数字的小仪式。"
        ],
        actions: ["把推荐号码当作轻松参考。", "如果购买，也先定好现实金额。", "今天只保留这一组，不要反复重抽。"],
        avoids: ["不要把号码当成中奖预测。", "不要超出原本设定的支出范围。"],
        timing: ["今天抽一次就好，结果前不要过度解读。", "把它当作小娱乐，不要连接其他重要决定。"],
        flow: ["数字来自牌面象征，意义在于参与感。", "轻松看待，幸运感才不会变成压力。"],
        colors: ["香槟金", "蛋白石白", "星光银", "深紫色"]
      }
    }
  },
  ja: {
    directionTone: {
      upright: "物事が自然な流れで進みやすいサインです。",
      reversed: "急がず、曖昧な部分を確認する必要があります。"
    },
    categoryCopy: {
      daily: {
        mood: ["整えてから動く日", "小さな変化が方向を作る日", "リズムを取り戻す日"],
        scenes: ["大きな問題ではなく、細かな予定や気分が重なって気になりやすい流れです。", "普通の一日に見えても、内側では優先順位を組み直しているかもしれません。"],
        actions: ["まず一つ小さな用事を終わらせましょう。", "大事な予定をもう一度確認しましょう。", "新しい用事を増やしすぎないでください。"],
        avoids: ["一時の気分で一日の予定を大きく変えないこと。", "小さなミスを一日全体の失敗にしないこと。"],
        timing: ["午前は整理、午後は実行に向いています。", "大事な判断は一度休んで見直すと安定します。"],
        flow: ["小さなことから整えると一日が見えやすくなります。", "余白を残すほど流れが安定します。"],
        colors: ["ディープバイオレット", "ムーンライトシルバー", "ミッドナイトブルー", "シャンパンゴールド"]
      },
      love: {
        mood: ["ゆっくり近づく気持ち", "誤解を減らす会話", "軽い接点が必要な関係"],
        scenes: ["返信速度や言葉の温度がいつもより気になりやすい時です。", "好意はあるのに、近づきすぎると重く見えそうで迷う流れです。"],
        actions: ["軽い挨拶や短い質問で空気を見ましょう。", "返信速度だけでなく会話の温度を見てください。", "小さな誘いで自然な接点を作りましょう。"],
        avoids: ["試す言葉や催促で相手の気持ちを測らないこと。", "確認する前に一人で結論を出さないこと。"],
        timing: ["深夜の感情的な連絡より、日中や夕方の軽い会話が向いています。", "今日中に関係を決めつけなくても大丈夫です。"],
        flow: ["強く証明するより、優しい確認が効きます。", "速度を合わせると安心感が戻ります。"],
        colors: ["ローズピンク", "ワインパープル", "ラベンダー", "ソフトゴールド"]
      },
      money: {
        mood: ["小さな支出を見直す時", "現実的な安定が必要", "お金の流れを整える日"],
        scenes: ["大きな出費より、小さな支払いの積み重ねが気になる流れです。", "欲しい気持ちと節約したい気持ちが同時に出て、判断が揺れやすいです。"],
        actions: ["最近一週間の支出を見てみましょう。", "欲しいものは一日置いてから判断しましょう。", "固定費を一つだけ見直してください。"],
        avoids: ["不安なまま大きな支払いを決めないこと。", "焦って一度に多くの金銭判断をしないこと。"],
        timing: ["支払いや契約はもう一度比較してからが安全です。", "今日気づいた支出は今週中に整えると効果的です。"],
        flow: ["小さな漏れを止めるほど金運は安定します。", "現実的な基準が流れを守ります。"],
        colors: ["アンティークゴールド", "エメラルド", "ディープグリーン", "カッパー"]
      },
      work: {
        mood: ["優先順位を取り戻す時", "小さな成果が効く流れ", "仕事範囲の確認が必要"],
        scenes: ["能力の問題ではなく、タスクが散らばって圧が増えている状態かもしれません。", "成果を急ぎたい一方で、やり直しが怖くて手が止まりやすい流れです。"],
        actions: ["今日一番急ぐ仕事を一つ決めましょう。", "始める前に相手が求める形を確認してください。", "確認できる小さな成果物を作りましょう。"],
        avoids: ["確認なしに責任範囲を広げないこと。", "速さだけを優先して修正を増やさないこと。"],
        timing: ["午前は優先順位、午後は共有に向いています。", "返事が必要なことは短くても今日確認しましょう。"],
        flow: ["範囲が明確になるほど圧は減ります。", "まず確認できる形にすることが鍵です。"],
        colors: ["ネイビー", "スチールブルー", "チャコール", "ゴールド"]
      },
      relationship: {
        mood: ["柔らかな確認が必要な関係", "距離調整の流れ", "言葉の温度が大切"],
        scenes: ["相手の何気ない一言を、こちらだけが長く考えてしまうかもしれません。", "関係を保ちたい気持ちと、自分の感情を後回しにしたくない気持ちが重なっています。"],
        actions: ["短い確認質問から始めましょう。", "相手の話を最後まで聞いてから伝えましょう。", "境界線は柔らかく、でも明確に伝えてください。"],
        avoids: ["相手の意図を悪く決めつけないこと。", "我慢をためて一度に爆発させないこと。"],
        timing: ["敏感な話はお互いに余裕がある時間に。", "今日解けない関係は、一日置くとやわらぎます。"],
        flow: ["推測より確認が関係を守ります。", "距離と表現は調整できます。"],
        colors: ["ライラック", "ミント", "ソフトゴールド", "スカイブルー"]
      },
      choice: {
        mood: ["基準を決める選択", "選択肢を整える時", "背負える方向を探す流れ"],
        scenes: ["どちらが良いかより、選んだ後に自分が背負えるかが大切です。", "心は傾いているのに、現実条件が迷わせているかもしれません。"],
        actions: ["一番失いたくない基準を一つ書きましょう。", "今日決めることと後でよいことを分けてください。", "時間と費用を現実的に比べましょう。"],
        avoids: ["条件が完璧になるまで何も選ばない状態を避けましょう。", "良い面だけ見て責任を無視しないこと。"],
        timing: ["今日は最終決定より基準整理に向いています。", "条件が明確な選択から処理しましょう。"],
        flow: ["手放すものが決まると答えが近づきます。", "気持ちと現実の交点を探す流れです。"],
        colors: ["インディゴ", "ホワイトゴールド", "オパール", "ブラックパープル"]
      },
      lotto: {
        mood: ["カードが選んだ今日の数字", "軽く楽しむ幸運番号", "三枚が残した数字の組み合わせ"],
        scenes: ["番号は期待感をくれますが、一つ一つに意味を付けすぎやすい時です。", "今回の番号はカードの象徴を数字に変えた小さな遊びです。"],
        actions: ["推薦番号は軽い参考として見ましょう。", "購入するなら金額を先に決めましょう。", "今日はこの一組だけを残しましょう。"],
        avoids: ["当選予測として受け取らないこと。", "決めた支出範囲を超えないこと。"],
        timing: ["今日は一度だけ引き、結果まで意味を付けすぎないでください。", "小さな楽しみとして残すのが安定します。"],
        flow: ["数字はカードの象徴から来ています。", "軽く見るほど幸運感がプレッシャーになりません。"],
        colors: ["シャンパンゴールド", "オパールホワイト", "スターシルバー", "ディープバイオレット"]
      }
    }
  },
  en: {
    directionTone: {
      upright: "The situation has room to move with a smoother natural rhythm.",
      reversed: "The message asks you to slow down and confirm what is still unclear."
    },
    categoryCopy: {
      daily: {
        mood: ["A day to organize before acting", "Small shifts create direction", "A day for calm recovery"],
        scenes: ["The issue may not be huge, but small tasks, messages, and moods can pile up in your head.", "It may look like an ordinary day, while inside you are rearranging your priorities."],
        actions: ["Finish one small task first.", "Check important plans and appointments one more time.", "Avoid adding too many new tasks today."],
        avoids: ["Do not let a passing mood rewrite your whole day.", "Do not turn one small mistake into a full-day failure story."],
        timing: ["Use the morning to organize and the afternoon to act.", "Pause once before making an important decision."],
        flow: ["Start with small order and the day becomes clearer.", "Leaving space in the schedule helps the flow stabilize."],
        colors: ["Deep Violet", "Moonlight Silver", "Midnight Blue", "Champagne Gold"]
      },
      love: {
        mood: ["Feelings moving closer slowly", "A conversation that reduces misunderstanding", "A light point of contact is needed"],
        scenes: ["Reply speed, tone, and who reaches out first may feel more meaningful than usual.", "You may like someone, but still worry that moving too fast will feel heavy."],
        actions: ["Open with a light check-in or short question.", "Read the warmth of the conversation, not only the reply speed.", "Create a small, easy point of contact."],
        avoids: ["Do not test the other person's feelings with pressure.", "Do not make a final conclusion before checking the facts."],
        timing: ["A daytime or early evening message is better than a late emotional one.", "You do not need to define the relationship today."],
        flow: ["Gentle confirmation works better than dramatic proof.", "When the pace matches, both excitement and safety return."],
        colors: ["Rose Pink", "Wine Purple", "Lavender", "Soft Gold"]
      },
      money: {
        mood: ["Time to check small leaks", "Realistic stability matters", "Rebalancing the money flow"],
        scenes: ["Money stress may come from many small payments rather than one big event.", "The desire to buy and the need to save may both appear at the same time."],
        actions: ["Review spending from the last week.", "Put wanted items on a list and decide tomorrow.", "Reduce one recurring or automatic expense."],
        avoids: ["Avoid large purchases when you are unsure.", "Do not make many financial decisions at once from anxiety."],
        timing: ["Compare once more before paying or signing.", "A spending issue noticed today works best if handled this week."],
        flow: ["Closing small leaks protects the larger money flow.", "A realistic boundary is more useful than optimistic guessing."],
        colors: ["Antique Gold", "Emerald", "Deep Green", "Copper"]
      },
      work: {
        mood: ["Time to recover priority", "A small deliverable creates momentum", "Work scope needs confirmation"],
        scenes: ["The problem may not be ability, but scattered tasks making your capacity look smaller.", "You may want results quickly, while fear of rework slows your hands."],
        actions: ["Choose the single most urgent task first.", "Confirm the expected output before starting.", "Create a small result that can be checked."],
        avoids: ["Do not expand responsibility without confirmation.", "Do not chase speed in a way that creates rework."],
        timing: ["Organize priorities in the morning and share output in the afternoon.", "Give a short confirmation today for anything waiting on your reply."],
        flow: ["The clearer the scope, the lighter the pressure.", "Make something checkable before making it perfect."],
        colors: ["Navy", "Steel Blue", "Charcoal", "Gold"]
      },
      relationship: {
        mood: ["A relationship needs a gentle check-in", "Distance needs adjusting", "The temperature of words matters"],
        scenes: ["A small comment may stay with you longer than the other person realizes.", "You may want to keep the relationship, but not keep postponing your own feelings."],
        actions: ["Start with a short clarifying question.", "Hear the other person out before responding.", "State your boundary softly but clearly."],
        avoids: ["Do not assume the other person's intention is negative.", "Do not store disappointment until it bursts at once."],
        timing: ["Bring up sensitive topics when both sides have enough room.", "A relationship that does not soften today may soften after a day of space."],
        flow: ["Confirmation protects the relationship better than guessing.", "Distance and expression can both be adjusted."],
        colors: ["Lilac", "Mint", "Soft Gold", "Sky Blue"]
      },
      choice: {
        mood: ["A choice that needs a standard", "Time to sort the options", "Finding a direction you can carry"],
        scenes: ["The key is not which option looks better, but what you can handle after choosing.", "Your heart may lean one way while real conditions pull another."],
        actions: ["Write down the one standard you do not want to lose.", "Separate what must be decided today from what can wait.", "Compare time and cost realistically."],
        avoids: ["Do not wait for every condition to become perfect.", "Do not look only at benefits while ignoring responsibility."],
        timing: ["Today is better for clarifying standards than forcing a final choice.", "Handle the choice with clearer conditions first."],
        flow: ["Once you know what to release, the answer becomes clearer.", "Find the overlap between desire and reality."],
        colors: ["Indigo", "White Gold", "Opal", "Black Purple"]
      },
      lotto: {
        mood: ["Today’s numbers chosen by the cards", "A light lucky-number ritual", "A number set left by three cards"],
        scenes: ["Numbers can feel exciting, but it is easy to give each one too much meaning.", "This reading is a small ritual that turns card symbols into numbers."],
        actions: ["Treat the numbers as a light reference.", "If you buy, decide the amount before acting.", "Keep today to this one number set."],
        avoids: ["Do not treat the numbers as a winning prediction.", "Do not go beyond your planned spending limit."],
        timing: ["Draw once today and avoid over-interpreting before the result.", "Keep it as a small entertainment moment."],
        flow: ["The numbers come from card symbols, not certainty.", "The lighter you hold it, the more it stays fun."],
        colors: ["Champagne Gold", "Opal White", "Star Silver", "Deep Violet"]
      }
    }
  }
};

function buildLocalizedDetail(
  detail: CardReadingDetail,
  selection: ResolvedCardSelection,
  language: Exclude<LanguageCode, "ko">,
  category: FortuneCategory,
  random: RandomSource
): CardReadingDetail {
  const t = translations[language];
  const copy = localizedReadingCopy[language];
  const categoryCopy = copy.categoryCopy[category];
  const cardName = getCardDisplayName(selection.card, language);
  const positionLabel = t.positions[selection.position];
  const directionLabel = t.directions[selection.direction];
  const scene = pickOne(categoryCopy.scenes, random);
  const action = pickOne(categoryCopy.actions, random);
  const tone = copy.directionTone[selection.direction];

  const text = {
    zh: {
      meaning: `${cardName} ${directionLabel}显示，${positionLabel}里最重要的是先看清实际状态。${tone}`,
      current: `${scene} 这张牌提醒你，眼前的情况不必用好坏二分，而要看哪里正在推动你改变反应方式。`,
      example: `例如，当你感觉事情卡住时，${cardName}把焦点放在“下一步能确认什么”上，而不是反复猜测结果。`,
      why: `${cardName}之所以重要，是因为它把模糊的情绪转成可执行的判断。你越早确认关键点，越不容易被同一个模式拖住。`,
      summary: `${positionLabel}的核心是把感觉变成具体行动。`,
      detail: `${scene} ${tone}`,
      advice: action,
      next: action
    },
    ja: {
      meaning: `${cardName} ${directionLabel}は、${positionLabel}でまず現実の状態を見る必要があることを示します。${tone}`,
      current: `${scene} このカードは、状況を良い悪いだけで決めず、どこから反応を変えられるかを見るよう促します。`,
      example: `たとえば物事が止まって見える時、${cardName}は結果を想像し続けるより「次に何を確認できるか」に焦点を戻します。`,
      why: `${cardName}が大事なのは、曖昧な気持ちを実行できる判断に変えてくれるからです。早く確認するほど同じ迷いに引き戻されにくくなります。`,
      summary: `${positionLabel}の核心は、感覚を具体的な行動へ変えることです。`,
      detail: `${scene} ${tone}`,
      advice: action,
      next: action
    },
    en: {
      meaning: `${cardName} ${directionLabel} shows that the key in ${positionLabel} is to read the real situation first. ${tone}`,
      current: `${scene} This card asks you not to label the situation as simply good or bad, but to notice where your next response can change the pattern.`,
      example: `For example, when things feel stuck, ${cardName} moves the focus from guessing the outcome to confirming the next practical step.`,
      why: `${cardName} matters because it turns a vague feeling into a usable decision. The sooner you confirm the key point, the less likely you are to repeat the same loop.`,
      summary: `The heart of ${positionLabel} is turning a feeling into a concrete move.`,
      detail: `${scene} ${tone}`,
      advice: action,
      next: action
    }
  }[language];

  return {
    ...detail,
    cardNameKo: cardName,
    directionLabel,
    positionLabel,
    cardMeaning: text.meaning,
    currentSituation: text.current,
    situationExample: text.example,
    whyThisMatters: text.why,
    summary: text.summary,
    detail: text.detail,
    advice: text.advice,
    nextStep: text.next
  };
}

export function localizeReading(
  reading: TarotReading,
  language: LanguageCode,
  category: FortuneCategory,
  selections: readonly ResolvedCardSelection[],
  random: RandomSource
): TarotReading {
  if (language === "ko") {
    return reading;
  }

  const t = translations[language];
  const copy = localizedReadingCopy[language];
  const categoryCopy = copy.categoryCopy[category];
  const categoryLabel = t.categories[category];
  const cardDetails = reading.cardDetails.map((detail, index) =>
    buildLocalizedDetail(detail, selections[index], language, category, random)
  );
  const cardNames = cardDetails.map((detail) => detail.cardNameKo);
  const storyTitle = pickOne(categoryCopy.mood, random);
  const scene = pickOne(categoryCopy.scenes, random);
  const flow = pickOne(categoryCopy.flow, random);
  const cautionCard = pickOne(cardDetails, random);

  const localized = {
    zh: {
      freeSummary: `${categoryLabel}中，${cardDetails[0].positionLabel}出现了${cardNames[0]}，${cardDetails[2].positionLabel}出现了${cardNames[2]}。${scene}`,
      detailedSummary: `${scene} ${cardNames[0]}说明现在表面上的流向，${cardNames[1]}指出隐藏原因，${cardNames[2]}给出接下来的行动线索。这次解读不只看好坏，而是把正在重复的生活场景整理成可以行动的顺序。`,
      overview: `这次解读里，${cardDetails[0].positionLabel}、${cardDetails[1].positionLabel}、${cardDetails[2].positionLabel}分别由${cardNames.join("、")}连接起来。${flow}`,
      connection: `${cardNames[0]}看当前气氛，${cardNames[1]}看背后的原因，${cardNames[2]}看下一步。三张牌连在一起时，重点不是马上下结论，而是先确认情绪、条件和行动顺序。`,
      overall: `${cardDetails[0].positionLabel}的${cardNames[0]}、${cardDetails[1].positionLabel}的${cardNames[1]}、${cardDetails[2].positionLabel}的${cardNames[2]}连成一个提醒：${flow}`,
      caution: `像${cautionCard.cardNameKo}的讯息一样，${cautionCard.advice}`
    },
    ja: {
      freeSummary: `${categoryLabel}では、${cardDetails[0].positionLabel}に${cardNames[0]}、${cardDetails[2].positionLabel}に${cardNames[2]}が出ています。${scene}`,
      detailedSummary: `${scene} ${cardNames[0]}は表に出ている流れを、${cardNames[1]}は隠れた原因を、${cardNames[2]}は次の行動のヒントを示します。今回のリーディングは良し悪しだけでなく、生活の中で繰り返される場面を行動順に整えるものです。`,
      overview: `今回の三枚は、${cardDetails[0].positionLabel}、${cardDetails[1].positionLabel}、${cardDetails[2].positionLabel}を${cardNames.join("、")}がつないでいます。${flow}`,
      connection: `${cardNames[0]}が今の空気を、${cardNames[1]}が背後の理由を、${cardNames[2]}が次の方向を開きます。三枚がつながる時、すぐ結論を出すより確認してから動くことが自然です。`,
      overall: `${cardDetails[0].positionLabel}の${cardNames[0]}、${cardDetails[1].positionLabel}の${cardNames[1]}、${cardDetails[2].positionLabel}の${cardNames[2]}がつながり、${flow}`,
      caution: `${cautionCard.cardNameKo}のメッセージのように、${cautionCard.advice}`
    },
    en: {
      freeSummary: `In ${categoryLabel}, ${cardNames[0]} appears in ${cardDetails[0].positionLabel}, and ${cardNames[2]} appears in ${cardDetails[2].positionLabel}. ${scene}`,
      detailedSummary: `${scene} ${cardNames[0]} describes what is visible now, ${cardNames[1]} points to the hidden cause, and ${cardNames[2]} gives the next-action clue. This reading is less about good or bad, and more about turning a repeated life pattern into a clear order of action.`,
      overview: `In this reading, ${cardNames.join(", ")} connect ${cardDetails[0].positionLabel}, ${cardDetails[1].positionLabel}, and ${cardDetails[2].positionLabel}. ${flow}`,
      connection: `${cardNames[0]} reads the current atmosphere, ${cardNames[1]} explains the reason behind it, and ${cardNames[2]} opens the next direction. Together, the cards suggest checking the situation before rushing to a conclusion.`,
      overall: `${cardNames[0]} in ${cardDetails[0].positionLabel}, ${cardNames[1]} in ${cardDetails[1].positionLabel}, and ${cardNames[2]} in ${cardDetails[2].positionLabel} connect into one message: ${flow}`,
      caution: `Following the message of ${cautionCard.cardNameKo}, ${cautionCard.advice}`
    }
  }[language];

  return {
    ...reading,
    storyTitle,
    freeSummary: localized.freeSummary,
    detailedSummary: localized.detailedSummary,
    situationOverview: localized.overview,
    oneLineAdvice: pickOne(categoryCopy.actions, random),
    cardDetails,
    connectionReading: localized.connection,
    relatablePatterns: [scene, pickOne(categoryCopy.flow, random), copy.directionTone[selections[0].direction]],
    actionItems: categoryCopy.actions,
    practicalNextSteps: categoryCopy.actions,
    avoidActions: categoryCopy.avoids,
    timingHint: pickOne(categoryCopy.timing, random),
    overallFlow: localized.overall,
    caution: localized.caution,
    luckyColor: pickOne(categoryCopy.colors, random),
    lotteryNote:
      category === "lotto"
        ? {
            zh: "这是把所选牌、位置、正位/逆位转换成数字的娱乐推荐。不保证中奖，也不是购买彩票的建议。",
            ja: "選んだカード、位置、正位置/逆位置を数字に変えた遊びの推薦です。当選を保証したり購入を勧めたりするものではありません。",
            en: "This is a playful number suggestion based on the selected cards, positions, and directions. It does not guarantee winning or recommend purchase."
          }[language]
        : reading.lotteryNote
  };
}
