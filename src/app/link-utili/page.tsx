import { LinkHub } from '@/components/LinkHub'
import property from '@/config/property.json'

export default function LinkUtiliPage() {
  return <LinkHub data={property.linkUtili} bordered />
}
