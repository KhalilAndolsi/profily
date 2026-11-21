import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import SimpleLinkPage from "../../../components/templates/link-page/SimpleLinkPage"
import api from "@/lib/api"

const templates = {
  simple: SimpleLinkPage,
}

const PreviewLinkPage = () => {
  const [searchParams] = useSearchParams()
  const [linkPage, setLinkPage] = useState(null)
  const username = searchParams.get("username")
  const template = searchParams.get("template") || "simple"
  const Template = templates[template] || templates.simple

  useEffect(() => {
    if (!username) return

    api.get(`/link-page/${encodeURIComponent(username)}`)
      .then((response) => setLinkPage(response.data.linkPage))
      .catch(() => setLinkPage(null))
  }, [username])

  return <Template portfolio={linkPage ?? undefined} />
}

export default PreviewLinkPage
