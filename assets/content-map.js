const siteContent = {
  title: "爱游戏",
  baseURL: "https://officialzh-i-game.com.cn",
  sections: [
    {
      id: 1,
      name: "首页",
      slug: "home",
      keywords: ["爱游戏", "热门", "推荐"],
      articleCount: 12
    },
    {
      id: 2,
      name: "新闻动态",
      slug: "news",
      keywords: ["爱游戏", "更新", "活动", "公告"],
      articleCount: 28
    },
    {
      id: 3,
      name: "游戏库",
      slug: "games",
      keywords: ["爱游戏", "单机", "网游", "手游", "休闲"],
      articleCount: 45
    },
    {
      id: 4,
      name: "攻略中心",
      slug: "guides",
      keywords: ["爱游戏", "攻略", "教程", "技巧", "秘籍"],
      articleCount: 63
    },
    {
      id: 5,
      name: "社区论坛",
      slug: "community",
      keywords: ["爱游戏", "讨论", "分享", "玩家"],
      articleCount: 19
    },
    {
      id: 6,
      name: "客服支持",
      slug: "support",
      keywords: ["爱游戏", "帮助", "FAQ", "反馈"],
      articleCount: 9
    }
  ],
  tags: [
    { name: "爱游戏官方", color: "#e74c3c" },
    { name: "爱游戏热门", color: "#f39c12" },
    { name: "爱游戏攻略", color: "#2ecc71" },
    { name: "爱游戏活动", color: "#3498db" },
    { name: "爱游戏社区", color: "#9b59b6" }
  ]
};

function searchContent(query, dataset) {
  const q = query.toLowerCase().trim();
  const results = [];

  for (const section of dataset.sections) {
    let match = false;

    if (section.name.toLowerCase().includes(q)) {
      match = true;
    }

    if (section.slug.toLowerCase().includes(q)) {
      match = true;
    }

    for (const kw of section.keywords) {
      if (kw.toLowerCase().includes(q)) {
        match = true;
        break;
      }
    }

    if (match) {
      results.push({
        sectionId: section.id,
        sectionName: section.name,
        slug: section.slug,
        articleCount: section.articleCount,
        matchedKeywords: section.keywords.filter(k => k.toLowerCase().includes(q))
      });
    }
  }

  return results;
}

function filterByTag(tagName, dataset) {
  const tagLower = tagName.toLowerCase().trim();
  const results = [];

  for (const section of dataset.sections) {
    for (const kw of section.keywords) {
      if (kw.toLowerCase().includes(tagLower)) {
        results.push({
          sectionId: section.id,
          sectionName: section.name,
          slug: section.slug,
          keyword: kw
        });
        break;
      }
    }
  }

  return results;
}

function listAllKeywords(dataset) {
  const keywordSet = new Set();

  for (const section of dataset.sections) {
    for (const kw of section.keywords) {
      keywordSet.add(kw);
    }
  }

  return Array.from(keywordSet).sort();
}

function getTagColor(tagName, dataset) {
  const tag = dataset.tags.find(t => t.name === tagName);
  return tag ? tag.color : "#95a5a6";
}

function displaySearchResults(query) {
  const results = searchContent(query, siteContent);

  if (results.length === 0) {
    console.log(`未找到与 "${query}" 相关的分区。`);
    return;
  }

  console.log(`搜索结果（关键词：${query}）：`);
  for (const r of results) {
    console.log(`  - ${r.sectionName} (${r.slug}), 文章数: ${r.articleCount}, 匹配标签: ${r.matchedKeywords.join(", ")}`);
  }
}

function displayTagFilter(tagName) {
  const results = filterByTag(tagName, siteContent);

  if (results.length === 0) {
    console.log(`没有分区包含标签 "${tagName}"。`);
    return;
  }

  console.log(`标签 "${tagName}" 关联的分区：`);
  for (const r of results) {
    console.log(`  - ${r.sectionName} (${r.slug})`);
  }
}

function runDemo() {
  console.log("=== 爱游戏站点内容地图 ===");
  console.log("网站:", siteContent.baseURL);
  console.log("");

  const allKeywords = listAllKeywords(siteContent);
  console.log("全站关键词:", allKeywords.join(", "));
  console.log("");

  displaySearchResults("爱游戏");
  console.log("");

  displaySearchResults("攻略");
  console.log("");

  displayTagFilter("爱游戏攻略");
  console.log("");

  const color = getTagColor("爱游戏热门", siteContent);
  console.log("爱游戏热门标签颜色:", color);
}

runDemo();