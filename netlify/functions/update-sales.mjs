import { getStore } from "@netlify/blobs"

const ITEM_URL = "https://k.youshop10.com/lHv-7QIv?a=b&p=iphone&wfr=BuyercopyURL&share_relation=e155a80fa1b026af_1388062718_1"
const INITIAL_STOCK = 99999

function readItems(html) {
  const patterns = [
    /&#34;id&#34;:\d+.*?&#34;stock&#34;:(\d+),&#34;title&#34;:&#34;(.*?)&#34;/g,
    /"id":\d+.*?"stock":(\d+),"title":"(.*?)"/g,
  ]

  for (const pattern of patterns) {
    const matches = [...html.matchAll(pattern)]
    if (matches.length) {
      return matches.map(([, stock, name]) => ({
        name,
        stock: Number(stock),
        sold: INITIAL_STOCK - Number(stock),
      }))
    }
  }
  throw new Error("未能从商品页读取属性库存，微店页面结构可能已变化。")
}

export default async () => {
  const response = await fetch(ITEM_URL, {
    headers: { "User-Agent": "Mozilla/5.0 (compatible; MagicPKDataBot/1.0)" },
  })
  if (!response.ok) throw new Error(`商品页请求失败：${response.status}`)

  const items = readItems(await response.text())
  if (items.length < 18) throw new Error(`属性数量异常：预期至少 18，实际 ${items.length}`)

  const snapshot = {
    updatedAt: new Date().toISOString(),
    source: ITEM_URL,
    initialStock: INITIAL_STOCK,
    items: items.sort((a, b) => b.sold - a.sold),
  }
  await getStore("magic-pk").setJSON("latest-sales", snapshot)
  console.log(`已更新 ${items.length} 个属性的销量数据。`)
  return new Response(null, { status: 204 })
}
