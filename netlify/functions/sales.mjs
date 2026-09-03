import { getStore } from "@netlify/blobs"

export default async () => {
  const snapshot = await getStore("magic-pk").get("latest-sales", { type: "json" })
  if (!snapshot) {
    return Response.json({ message: "销量数据正在准备中，请稍后刷新。" }, { status: 404 })
  }
  return Response.json(snapshot, {
    headers: { "Cache-Control": "public, max-age=60, s-maxage=60" },
  })
}
