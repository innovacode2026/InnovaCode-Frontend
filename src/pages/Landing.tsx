import { useState, useRef } from 'react'
import { AppContext } from '../types'
import { categories } from '../data/mockData'
import Encabezado from '../components/Header'
import PieDePagina from '../components/Footer'
import TarjetaProducto from '../components/ProductCard'
import { ChevronRightIcon, TrendUpIcon, PackageIcon, UsersIcon, StarIcon, ShieldIcon, LockIcon } from '../components/Icons'
import { Smartphone, Monitor, Tablet, Headphones, Wrench, Gamepad2, type LucideIcon } from 'lucide-react'
import type { JSX } from 'react'

const PARTICLES = Array.from({ length: 28 }, (_, i) => ({
  id: i,
  left: `${(i * 37 + 5) % 95}%`,
  top: `${(i * 53 + 10) % 90}%`,
  size: i % 3 === 0 ? 3 : i % 3 === 1 ? 2 : 1.5,
  delay: `${(i * 0.4) % 4}s`,
  duration: `${3 + (i % 3)}s`,
}))

const categoryIconMap: Record<string, LucideIcon> = {
  Smartphone,
  Monitor,
  Tablet,
  Headphones,
  Wrench,
  Gamepad2,
}

const brandLogos: Record<string, JSX.Element> = {
  Samsung: (
    <img src="https://logo-teka.com/wp-content/uploads/2025/06/samsung-logo.png" alt="Samsung" className="h-full w-auto object-contain" style={{ filter: 'grayscale(1) opacity(0.7)' }} />
  ),
  Dell: (
    <img src="https://logo-teka.com/wp-content/uploads/2025/07/dell-vertical-logo.png" alt="Dell" className="h-full w-auto object-contain" style={{ filter: 'grayscale(1) opacity(0.7)' }} />
  ),
  LG: (
    <img src="https://logo-teka.com/wp-content/uploads/2025/07/lg-electronics-logo.png" alt="LG" className="h-full w-auto object-contain" style={{ filter: 'grayscale(1) opacity(0.7)' }} />
  ),
  Sony: (
    <img src="https://logo-teka.com/wp-content/uploads/2025/06/sony-logo.png" alt="Sony" className="h-full w-auto object-contain" style={{ filter: 'grayscale(1) opacity(0.7)' }} />
  ),
  Xbox: (
    <img src="https://logo-teka.com/wp-content/uploads/2025/08/xbox-icon-logo.png" alt="Xbox" className="h-full w-auto object-contain" style={{ filter: 'grayscale(1) opacity(0.7)', transform: 'scale(1.45)' }} />
  ),
  Xiaomi: (
    <img src="https://logo-teka.com/wp-content/uploads/2025/06/xiaomi-sign-logo.png" alt="Xiaomi" className="h-full w-auto object-contain" style={{ filter: 'grayscale(1) opacity(0.7)' }} />
  ),
  Apple: (
    <img src="https://logo-teka.com/wp-content/uploads/2025/06/apple-logo.png" alt="Apple" className="h-full w-auto object-contain" style={{ filter: 'grayscale(1) opacity(0.7)' }} />
  ),
  macOS: (
    <svg role="img" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-auto" xmlns="http://www.w3.org/2000/svg" aria-label="macOS">
      <path d="M0 14.727h.941v-2.453c0-.484.318-.835.771-.835.439 0 .71.276.71.722v2.566h.915V12.25c0-.48.31-.812.764-.812.46 0 .718.28.718.77v2.518h.94v-2.748c0-.801-.517-1.334-1.307-1.334-.578 0-1.054.31-1.247.805h-.023c-.147-.514-.552-.805-1.118-.805-.545 0-.968.306-1.142.771H.903v-.695H0v4.006zm7.82-.646c-.408 0-.68-.208-.68-.537 0-.318.26-.522.714-.552l.926-.057v.307c0 .483-.427.839-.96.839zm-.284.71c.514 0 1.017-.268 1.248-.703h.018v.639h.908v-2.76c0-.804-.647-1.33-1.64-1.33-1.021 0-1.66.537-1.701 1.285h.873c.06-.332.344-.548.79-.548.464 0 .748.242.748.662v.287l-1.058.06c-.976.061-1.524.488-1.524 1.199 0 .721.564 1.209 1.338 1.209zm6.305-2.642c-.065-.843-.719-1.512-1.777-1.512-1.164 0-1.92.805-1.92 2.087 0 1.3.756 2.082 1.928 2.082 1.005 0 1.697-.59 1.772-1.485h-.888c-.087.453-.397.725-.873.725-.597 0-.982-.483-.982-1.322 0-.824.381-1.323.975-1.323.502 0 .8.321.876.748h.889zm2.906-2.967c-1.591 0-2.589 1.085-2.589 2.82 0 1.735.998 2.816 2.59 2.816 1.586 0 2.584-1.081 2.584-2.816 0-1.735-.997-2.82-2.585-2.82zm0 .832c.971 0 1.591.77 1.591 1.988 0 1.213-.62 1.984-1.59 1.984-.976 0-1.592-.77-1.592-1.984 0-1.217.616-1.988 1.591-1.988zm2.982 3.178c.042 1.006.866 1.626 2.12 1.626 1.32 0 2.151-.65 2.151-1.686 0-.813-.469-1.27-1.576-1.523l-.627-.144c-.67-.158-.945-.37-.945-.733 0-.453.415-.756 1.032-.756.623 0 1.05.306 1.096.817h.93c-.023-.96-.817-1.61-2.019-1.61-1.187 0-2.03.653-2.03 1.62 0 .78.477 1.263 1.482 1.494l.707.166c.688.163.967.39.967.782 0 .454-.457.779-1.115.779-.665 0-1.167-.329-1.228-.832h-.945z" />
    </svg>
  ),
  HP: (
    <img src="https://logo-teka.com/wp-content/uploads/2025/07/hp-logo.png" alt="HP" className="h-full w-auto object-contain" style={{ filter: 'grayscale(1) opacity(0.7)' }} />
  ),
  Huawei: (
    <img src="https://logo-teka.com/wp-content/uploads/2025/06/huawei-logo.png" alt="Huawei" className="h-full w-auto object-contain" style={{ filter: 'grayscale(1) opacity(0.7)' }} />
  ),
  ASUS: (
    <svg role="img" viewBox="0 9.3 24 5.5" xmlns="http://www.w3.org/2000/svg" className="h-7 w-auto" fill="currentColor" style={{ opacity: 0.7, color: '#555' }}>
      <path d="M23.904 10.788V9.522h-4.656c-.972 0-1.41.6-1.482 1.182v.018-1.2h-1.368v1.266h1.362zm-6.144.456l-1.368-.078v1.458c0 .456-.228.594-1.02.594H14.28c-.654 0-.93-.186-.93-.594v-1.596l-1.386-.102v1.812h-.03c-.078-.528-.276-1.14-1.596-1.23L6 11.22c0 .666.474 1.062 1.218 1.14l3.024.306c.24.018.414.09.414.288 0 .216-.18.24-.456.24H5.946V11.22l-1.386-.09v3.348h5.646c1.26 0 1.662-.654 1.722-1.2h.03c.156.864.912 1.2 2.19 1.2h1.41c1.494 0 2.202-.456 2.202-1.524zm4.398.258l-4.338-.258c0 .666.438 1.11 1.182 1.17l3.09.24c.24.018.384.078.384.276 0 .186-.168.258-.516.258h-4.212v1.29h4.302c1.356 0 1.95-.474 1.95-1.554 0-.972-.534-1.338-1.842-1.422zm-10.194-1.98h1.386v1.266h-1.386zM3.798 11.07l-1.506-.15L0 14.478h1.686zm7.914-1.548h-4.23c-.984 0-1.416.612-1.518 1.2v-1.2H3.618c-.33 0-.486.102-.642.33l-.648.936h9.384Z" />
    </svg>
  ),
  Canon: (
    <img src="https://logo-teka.com/wp-content/uploads/2025/10/canon-logo.png" alt="Canon" className="h-full w-auto object-contain" style={{ filter: 'grayscale(1) opacity(0.7)' }} />
  ),
  Lenovo: (
    <img src="https://logo-teka.com/wp-content/uploads/2025/07/lenovo-logo.png" alt="Lenovo" className="h-full w-auto object-contain" style={{ filter: 'grayscale(1) opacity(0.7)' }} />
  ),
  Google: (
    <img src="https://logo-teka.com/wp-content/uploads/2025/06/google-logo.png" alt="Google" className="h-full w-auto object-contain" style={{ filter: 'grayscale(1) opacity(0.7)' }} />
  ),
  Oppo: (
    <img src="https://logo-teka.com/wp-content/uploads/2025/07/oppo-logo.png" alt="OPPO" className="h-full w-auto object-contain" style={{ filter: 'grayscale(1) opacity(0.7)' }} />
  ),
  Microsoft: (
    <img src="https://logo-teka.com/wp-content/uploads/2025/06/microsoft-logo.png" alt="Microsoft" className="h-full w-auto object-contain" style={{ filter: 'grayscale(1) opacity(0.7)' }} />
  ),
  Motorola: (
    <img src="https://logo-teka.com/wp-content/uploads/2025/07/motorola-sign-logo.png" alt="Motorola" className="h-full w-auto object-contain" style={{ filter: 'grayscale(1) opacity(0.7)' }} />
  ),
}

export default function PaginaInicio(ctx: AppContext) {
  const { navigate, products } = ctx

  const featured = products.filter(p => p.status === 'active').slice(0, 4)
  const recent = products.filter(p => p.status === 'active').slice(4, 8)

  const [mouse, setMouse] = useState({ x: 0, y: 0 })
  const heroRef = useRef<HTMLElement>(null)

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = heroRef.current?.getBoundingClientRect()
    if (!rect) return
    setMouse({
      x: (e.clientX - rect.left - rect.width / 2) / rect.width,
      y: (e.clientY - rect.top - rect.height / 2) / rect.height,
    })
  }

  const stats = [
    { label: 'Productos disponibles', value: '165+', icon: PackageIcon, color: 'text-primary' },
    { label: 'Usuarios activos', value: '2.4K+', icon: UsersIcon, color: 'text-success' },
    { label: 'Calificaciones', value: '12K+', icon: StarIcon, color: 'text-amber-500' },
    { label: 'Categorías', value: '6', icon: TrendUpIcon, color: 'text-violet-500' },
  ]

  const ofertaMarcas = [
    {
      key: 'ASUS',
      svg: (
        <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-8 w-auto" fill="white" aria-label="ASUS">
          <path d="M23.904 10.788V9.522h-4.656c-.972 0-1.41.6-1.482 1.182v.018-1.2h-1.368v1.266h1.362zm-6.144.456l-1.368-.078v1.458c0 .456-.228.594-1.02.594H14.28c-.654 0-.93-.186-.93-.594v-1.596l-1.386-.102v1.812h-.03c-.078-.528-.276-1.14-1.596-1.23L6 11.22c0 .666.474 1.062 1.218 1.14l3.024.306c.24.018.414.09.414.288 0 .216-.18.24-.456.24H5.946V11.22l-1.386-.09v3.348h5.646c1.26 0 1.662-.654 1.722-1.2h.03c.156.864.912 1.2 2.19 1.2h1.41c1.494 0 2.202-.456 2.202-1.524zm4.398.258l-4.338-.258c0 .666.438 1.11 1.182 1.17l3.09.24c.24.018.384.078.384.276 0 .186-.168.258-.516.258h-4.212v1.29h4.302c1.356 0 1.95-.474 1.95-1.554 0-.972-.534-1.338-1.842-1.422zm-10.194-1.98h1.386v1.266h-1.386zM3.798 11.07l-1.506-.15L0 14.478h1.686zm7.914-1.548h-4.23c-.984 0-1.416.612-1.518 1.2v-1.2H3.618c-.33 0-.486.102-.642.33l-.648.936h9.384Z" />
        </svg>
      ),
    },
    {
      key: 'Samsung',
      svg: (
        <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-10 w-auto" fill="white" aria-label="Samsung">
          <path d="M19.8166 10.2808l.0459 2.6934h-.023l-.7793-2.6934h-1.2837v3.3925h.8481l-.0458-2.785h.023l.8366 2.785h1.2264v-3.3925zm-16.149 0l-.6418 3.427h.9284l.4699-3.1175h.0229l.4585 3.1174h.9169l-.6304-3.4269zm5.1805 0l-.424 2.6132h-.023l-.424-2.6132H6.5788l-.0688 3.427h.8596l.023-3.0832h.0114l.573 3.0831h.8711l.5731-3.083h.023l.0228 3.083h.8596l-.0802-3.4269zm-7.2664 2.4527c.0343.0802.0229.1949.0114.2522-.0229.1146-.1031.2292-.3324.2292-.2177 0-.3438-.126-.3438-.3095v-.3323H0v.2636c0 .7679.6074.9971 1.2493.9971.6189 0 1.1346-.2178 1.2149-.7794.0458-.298.0114-.4928 0-.5616-.1605-.722-1.467-.9283-1.5588-1.3295-.0114-.0688-.0114-.1375 0-.1834.023-.1146.1032-.2292.3095-.2292.2063 0 .321.126.321.3095v.2063h.8595v-.2407c0-.745-.6762-.8596-1.1576-.8596-.6074 0-1.1117.2063-1.2034.7564-.023.149-.0344.2866.0114.4585.1376.7106 1.364.9169 1.5358 1.3524m11.152 0c.0343.0803.0228.1834.0114.2522-.023.1146-.1032.2292-.3324.2292-.2178 0-.3438-.126-.3438-.3095v-.3323h-.917v.2636c0 .7564.596.9857 1.2379.9857.6189 0 1.1232-.2063 1.2034-.7794.0459-.298.0115-.4814 0-.5616-.1375-.7106-1.4327-.9284-1.5243-1.318-.0115-.0688-.0115-.1376 0-.1835.0229-.1146.1031-.2292.3094-.2292.1948 0 .321.126.321.3095v.2063h.848v-.2407c0-.745-.6647-.8596-1.146-.8596-.6075 0-1.1004.1948-1.192.7564-.023.149-.023.2866.0114.4585.1376.7106 1.341.9054 1.513 1.3524m2.8882.4585c.2407 0 .3094-.1605.3323-.2522.0115-.0343.0115-.0917.0115-.126v-2.533h.871v2.4642c0 .0688 0 .1948-.0114.2292-.0573.6419-.5616.8482-1.192.8482-.6303 0-1.1346-.2063-1.192-.8482 0-.0344-.0114-.1604-.0114-.2292v-2.4642h.871v2.533c0 .0458 0 .0916.0115.126 0 .0917.0688.2522.3095.2522m7.1518-.0344c.2522 0 .3324-.1605.3553-.2522.0115-.0343.0115-.0917.0115-.126v-.4929h-.3553v-.5043H24v.917c0 .0687 0 .1145-.0115.2292-.0573.6303-.596.8481-1.2034.8481-.6075 0-1.1461-.2178-1.2034-.8481-.0115-.1147-.0115-.1605-.0115-.2293v-1.444c0-.0574.0115-.172.0115-.2293.0802-.6419.596-.8482 1.2034-.8482s1.1347.2063 1.2034.8482c.0115.1031.0115.2292.0115.2292v.1146h-.8596v-.1948s0-.0803-.0115-.1261c-.0114-.0802-.0802-.2521-.3438-.2521-.2521 0-.321.1604-.3438.2521-.0115.0458-.0115.1032-.0115.1605v1.5702c0 .0458 0 .0916.0115.126 0 .0917.0917.2522.3323.2522" />
        </svg>
      ),
    },
    {
      key: 'HP',
      svg: (
        <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-6 w-auto" fill="white" aria-label="HP">
          <path d="M12.0069 24h-.3572l2.459-6.7453h3.3796c.5907 0 1.2364-.4533 1.4424-1.0166l2.6652-7.3085c.4396-1.1952-.2473-2.1706-1.525-2.1706h-4.6983l-3.929 10.798-2.2255 6.127C3.929 22.434 0 17.6806 0 12.007 0 6.498 3.7092 1.8546 8.7647.4396L6.4705 6.759 2.6514 17.2547h2.5415L8.4488 8.339h1.9095l-3.2558 8.9158H9.644l3.0223-8.3251c.4396-1.1952-.2473-2.1706-1.525-2.1706h-2.143l2.459-6.7453C11.636 0 11.8145 0 11.9931 0 18.6285 0 24 5.3715 24 12.007c.0137 6.6216-5.3578 11.993-11.9931 11.993zM19.2742 8.325h-1.9096l-2.6789 7.336h1.9096l2.6789-7.336z" />
        </svg>
      ),
    },
    {
      key: 'Lenovo',
      svg: (
        <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-10 w-auto" fill="white" aria-label="Lenovo">
          <path d="M21.044 12.288c0 .5-.343.867-.815.867-.464 0-.827-.38-.827-.867 0-.51.343-.868.815-.868.464 0 .827.381.827.868zm-14.305-.92a.787.787 0 0 0-.651.307.991.991 0 0 0-.172.738l1.479-.614a.708.708 0 0 0-.656-.43zm6.963.052c-.472 0-.816.358-.816.868 0 .486.364.867.828.867.472 0 .815-.368.815-.867 0-.487-.363-.868-.827-.868zM24 7.997v8.006H0V7.997h24zM5.01 13.05H3.088V9.825H2.23v4.003h2.78v-.777zm1.137-.094l2.163-.897a1.667 1.667 0 0 0-.37-.86c-.284-.33-.704-.505-1.216-.505-.931 0-1.633.686-1.633 1.593 0 .93.704 1.593 1.726 1.593.572 0 1.158-.272 1.432-.589l-.535-.411c-.357.264-.56.326-.885.326-.292 0-.52-.09-.682-.25zm5.57-1.039c0-.709-.507-1.223-1.252-1.223a1.28 1.28 0 0 0-1.005.494v-.442h-.846v3.081h.846v-1.753c0-.316.245-.651.698-.651.35 0 .712.243.712.651v1.753h.847v-1.91zm3.647.37c0-.904-.725-1.593-1.65-1.593-.933 0-1.663.7-1.663 1.593 0 .903.726 1.592 1.651 1.592.932 0 1.662-.7 1.662-1.592zm2.066 1.54l1.268-3.081h-.967l-.765 2.099-.765-2.1h-.966l1.268 3.081h.927zm4.449-1.54c0-.904-.725-1.593-1.65-1.593-.932 0-1.662.7-1.662 1.593 0 .903.725 1.592 1.65 1.592.932 0 1.662-.7 1.662-1.592z" />
        </svg>
      ),
    },
    {
      key: 'Acer',
      svg: (
        <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-8 w-auto" fill="white" aria-label="Acer">
          <path d="M23.943 9.364c-.085-.113-.17-.198-.595-.226-.113 0-.453-.029-1.048-.029-1.56 0-2.636.482-3.175 1.417.142-.935-.765-1.417-2.749-1.417-2.324 0-3.798.935-4.393 2.834-.226.709-.226 1.276-.056 1.73h-.567c-.425.027-.992.056-1.36.056-.85 0-1.39-.142-1.588-.425-.17-.255-.17-.737.057-1.446.368-1.162 1.247-1.672 2.664-1.672.737 0 1.445.085 1.445.085.085 0 .142-.113.142-.198l-.028-.085-.057-.397c-.028-.255-.227-.397-.567-.453-.311-.029-.567-.029-.907-.029h-.028c-1.842 0-3.146.624-3.854 1.814.255-1.219-.596-1.814-2.551-1.814-1.105 0-1.9.029-2.353.085-.368.057-.595.199-.68.454l-.17.51c-.028.085.029.142.142.142.085 0 .425-.057.992-.086a24.816 24.816 0 0 1 1.672-.085c1.077 0 1.559.284 1.389.822-.029.114-.114.199-.255.227-1.02.17-1.842.284-2.438.369-1.7.226-2.692.736-2.947 1.587-.369 1.162.538 1.728 2.72 1.728 1.078 0 2.013-.056 2.75-.198.425-.085.652-.17.737-.453l.396-1.304c-.028 1.304.85 1.955 2.721 1.955.794 0 1.559-.028 1.927-.085.369-.056.567-.141.652-.425l.085-.396c.397.623 1.276.935 2.608.935 1.417 0 2.239-.029 2.465-.114a.523.523 0 0 0 .369-.311l.028-.085.17-.539c.029-.085-.028-.142-.142-.142l-.906.057c-.596.029-1.077.057-1.418.057-.651 0-1.076-.057-1.332-.142-.368-.142-.538-.397-.51-.822l2.863-.368c1.275-.17 2.154-.567 2.579-1.19l-.992 3.315c-.028.057 0 .114.028.142.029.028.085.057.199.057h1.19c.198 0 .283-.114.312-.199l1.048-3.656c.142-.481.567-.708 1.36-.708.71 0 1.22 0 1.56.028h.028c.057 0 .17-.028.255-.17l.17-.51c0-.085 0-.17-.057-.227zM4.841 13.73c-.368.057-.907.085-1.587.085-1.219 0-1.729-.255-1.587-.737.113-.34.425-.567.935-.624l2.75-.368zm12.669-2.95c-.114.369-.652.624-1.616.766l-2.295.311.056-.198c.199-.624.454-1.02.794-1.247.34-.227.907-.34 1.7-.34 1.05.028 1.503.255 1.36.708Z" />
        </svg>
      ),
    },
    {
      key: 'Apple',
      svg: (
        <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-6 w-auto" fill="white" aria-label="Apple">
          <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" />
        </svg>
      ),
    },
  ]
  const tickerBrands = ['Apple', 'Samsung', 'Dell', 'ASUS', 'Lenovo', 'HP', 'Huawei', 'Canon', 'Sony', 'LG', 'Xbox', 'Xiaomi', 'Google', 'Oppo', 'Motorola', 'Microsoft']

  return (
    <div className="min-h-screen flex flex-col">
      <Encabezado {...ctx} />

      {/* Hero futurista */}
      <section
        ref={heroRef}
        className="relative overflow-hidden flex items-center"
        style={{ background: '#050816', minHeight: '100vh' }}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setMouse({ x: 0, y: 0 })}
      >
        {/* Grid tecnológico */}
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: `linear-gradient(rgba(139,92,246,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.04) 1px, transparent 1px)`, backgroundSize: '60px 60px' }} />

        {/* Orbes */}
        <div className="absolute pointer-events-none" style={{ top: '-10%', left: '-5%', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(139,92,246,0.18) 0%, transparent 65%)', filter: 'blur(40px)' }} />
        <div className="absolute pointer-events-none" style={{ top: '20%', right: '10%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(139,92,246,0.14) 0%, transparent 65%)', filter: 'blur(50px)' }} />
        <div className="absolute pointer-events-none" style={{ bottom: '-5%', right: '30%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 65%)', filter: 'blur(40px)' }} />

        {/* Partículas */}
        {PARTICLES.map(p => (
          <div key={p.id} className="absolute rounded-full pointer-events-none" style={{ left: p.left, top: p.top, width: `${p.size}px`, height: `${p.size}px`, background: p.id % 2 === 0 ? '#8B5CF6' : '#06B6D4', animation: `particlePulse ${p.duration} ease-in-out infinite`, animationDelay: p.delay }} />
        ))}

        {/* Scan lines */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute w-full" style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(139,92,246,0.3), transparent)', animation: 'scanLine 8s linear infinite', top: '30%' }} />
          <div className="absolute w-full" style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(124,58,237,0.2), transparent)', animation: 'scanLine 12s linear infinite 4s', top: '65%' }} />
        </div>

        <div className="relative w-full max-w-7xl mx-auto px-8 sm:px-12 lg:px-16 py-20 lg:py-0 grid lg:grid-cols-2 gap-8 items-center">

          {/* Texto */}
          <div className="z-10">
            <div className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-1.5 rounded-full mb-8" style={{ background: 'rgba(139,92,246,0.08)', border: '1px solid rgba(139,92,246,0.25)', color: '#8B5CF6' }}>
              <span className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6] animate-pulse" />
              NUEVA GENERACIÓN
            </div>
            <h1 className="font-display font-900 text-white leading-tight mb-6" style={{ fontSize: 'clamp(2.6rem, 5.2vw, 4.2rem)', fontWeight: 600 }}>
              Potencia tu{' '}
              <span style={{ background: 'linear-gradient(135deg, #8B5CF6, #06B6D4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', filter: 'drop-shadow(0 0 20px rgba(139,92,246,0.5))' }}>
                mundo digital
              </span>
            </h1>
            <p className="text-white/50 text-lg leading-relaxed mb-10 max-w-md">
              Los mejores celulares, laptops y accesorios con garantía oficial, soporte técnico y envío a todo el país.
            </p>
            <div className="flex flex-wrap gap-4 mb-12">
              <button onClick={() => navigate('catalog')} className="relative px-8 py-4 text-sm font-bold rounded-xl text-white cursor-pointer overflow-hidden" style={{ background: 'linear-gradient(135deg, #8B5CF6, #7C3AED)', boxShadow: '0 0 30px rgba(139,92,246,0.35)', transition: 'all 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 0 50px rgba(139,92,246,0.6)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 0 30px rgba(139,92,246,0.35)'; e.currentTarget.style.transform = 'translateY(0)' }}
              >
                <span className="relative z-10">Comprar ahora</span>
                <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.15), transparent)', animation: 'btnShine 3s ease-in-out infinite' }} />
              </button>
              <button onClick={() => navigate('catalog')} className="px-8 py-4 text-sm font-bold rounded-xl cursor-pointer" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(139,92,246,0.3)', color: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(12px)', transition: 'all 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(139,92,246,0.1)'; e.currentTarget.style.borderColor = 'rgba(139,92,246,0.6)' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.borderColor = 'rgba(139,92,246,0.3)' }}
              >
                Explorar catálogo
              </button>
            </div>
            <div className="flex flex-wrap gap-8">
              {[{ val: '165+', label: 'Productos' }, { val: '2.4K+', label: 'Clientes' }, { val: '4.9★', label: 'Calificación' }].map(s => (
                <div key={s.val}>
                  <div className="font-display font-900 text-2xl" style={{ color: '#8B5CF6' }}>{s.val}</div>
                  <div className="text-white/35 text-xs mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Imágenes flotantes */}
          <div className="relative hidden lg:flex items-center justify-center" style={{ height: '600px' }}>

            {/* Arco decorativo de brillo */}
            <div className="absolute pointer-events-none" style={{ width: '480px', height: '260px', border: '1px solid rgba(6,182,212,0.18)', borderRadius: '50%', boxShadow: '0 0 25px rgba(6,182,212,0.12)', top: '200px', left: '50%', transform: 'translateX(-50%) rotate(-18deg)' }} />

            {/* ── LAPTOP – pieza central ── */}
            <div className="absolute" style={{ width: '320px', bottom: '30px', left: '50%', zIndex: 2, transform: `translateX(-50%) translate(${mouse.x * -18}px, ${mouse.y * -10}px)`, animation: 'heroFloat 6s ease-in-out infinite', transition: 'transform 0.15s ease-out', filter: 'drop-shadow(0 24px 60px rgba(139,92,246,0.45))' }}>
              <img src="https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&h=400&fit=crop&auto=format" alt="Laptop" className="w-full object-contain rounded-2xl" />
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 rounded-full" style={{ width: '60%', height: '20px', background: 'rgba(139,92,246,0.35)', filter: 'blur(18px)' }} />
            </div>

            {/* PS5 – arriba centro-izquierda (por encima del laptop) */}
            <div className="absolute" style={{ width: '120px', top: '20px', left: 'calc(50% - 130px)', zIndex: 3, transform: `translate(${mouse.x * -30}px, ${mouse.y * -35}px) rotate(-8deg)`, animation: 'heroFloat 4.5s ease-in-out infinite 1s', transition: 'transform 0.15s ease-out', filter: 'drop-shadow(0 12px 40px rgba(139,92,246,0.55))' }}>
              <img src="https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=400&h=400&fit=crop&auto=format" alt="PS5" className="w-full object-contain rounded-2xl" />
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 rounded-full" style={{ width: '55%', height: '10px', background: 'rgba(139,92,246,0.4)', filter: 'blur(9px)' }} />
            </div>

            {/* Headphones – arriba derecha */}
            <div className="absolute" style={{ width: '118px', top: '12px', right: '5px', zIndex: 3, transform: `translate(${mouse.x * -38}px, ${mouse.y * -28}px) rotate(8deg)`, animation: 'heroFloat 5s ease-in-out infinite 1.5s', transition: 'transform 0.15s ease-out', filter: 'drop-shadow(0 12px 40px rgba(6,182,212,0.5))' }}>
              <img src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop&auto=format" alt="Headphones" className="w-full object-contain rounded-2xl" />
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 rounded-full" style={{ width: '55%', height: '10px', background: 'rgba(6,182,212,0.35)', filter: 'blur(9px)' }} />
            </div>

            {/* Earbuds – abajo izquierda, delante del laptop */}
            <div className="absolute" style={{ width: '140px', bottom: '65px', left: '40px', zIndex: 4, transform: `translate(${mouse.x * -22}px, ${mouse.y * -18}px) rotate(-10deg)`, animation: 'heroFloat 5.5s ease-in-out infinite 0.5s', transition: 'transform 0.15s ease-out', filter: 'drop-shadow(0 14px 44px rgba(6,182,212,0.6))' }}>
              <img src="https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=400&h=400&fit=crop&auto=format" alt="TWS Earbuds" className="w-full object-contain rounded-2xl" />
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 rounded-full" style={{ width: '55%', height: '10px', background: 'rgba(6,182,212,0.4)', filter: 'blur(9px)' }} />
            </div>

            {/* Smartwatch – derecha, entre headphones y laptop */}
            <div className="absolute" style={{ width: '118px', top: '48%', right: '210px', zIndex: 4, transform: `translate(${mouse.x * -28}px, ${mouse.y * -20}px) rotate(5deg)`, animation: 'heroFloat 6.5s ease-in-out infinite 2s', transition: 'transform 0.15s ease-out', filter: 'drop-shadow(0 12px 38px rgba(139,92,246,0.5))' }}>
              <img src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop&auto=format" alt="Smartwatch" className="w-full object-contain rounded-2xl" />
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 rounded-full" style={{ width: '55%', height: '10px', background: 'rgba(139,92,246,0.35)', filter: 'blur(9px)' }} />
            </div>

            {/* Badge precio – abajo centro */}
            <div className="absolute px-4 py-2 rounded-xl text-xs font-bold" style={{ bottom: '18px', left: 'calc(50% - 130px)', zIndex: 5, background: 'rgba(124,58,237,0.2)', border: '1px solid rgba(124,58,237,0.4)', backdropFilter: 'blur(16px)', color: 'white', transform: `translate(${mouse.x * -28}px, ${mouse.y * -15}px)`, transition: 'transform 0.15s ease-out', animation: 'heroFloat 5.5s ease-in-out infinite 1s' }}>
              <div className="text-white/40 text-[10px] mb-0.5">DESDE</div>
              <div className="text-base font-900" style={{ color: '#8B5CF6' }}>$ 1.299.000</div>
            </div>

            {/* Badge specs – abajo derecha */}
            <div className="absolute px-3 py-2 rounded-xl text-xs font-semibold" style={{ bottom: '18px', right: '8px', zIndex: 5, background: 'rgba(5,8,22,0.88)', border: '1px solid rgba(139,92,246,0.28)', backdropFilter: 'blur(16px)', color: '#8B5CF6', transform: `translate(${mouse.x * -20}px, ${mouse.y * -10}px)`, transition: 'transform 0.15s ease-out', animation: 'heroFloat 7s ease-in-out infinite 2.5s' }}>
              <div className="text-white/50 text-[10px] mb-0.5">PROCESADOR</div>
              <div>Intel Core i9 · 32GB</div>
            </div>

          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(139,92,246,0.4), rgba(124,58,237,0.4), transparent)' }} />
      </section>

      {/* Ticker de marcas */}
      <div className="bg-white border-b border-border overflow-hidden relative py-5">
        <div className="absolute inset-y-0 left-0 w-20 z-10 pointer-events-none" style={{ background: 'linear-gradient(to right, white, transparent)' }} />
        <div className="absolute inset-y-0 right-0 w-20 z-10 pointer-events-none" style={{ background: 'linear-gradient(to left, white, transparent)' }} />
        <div className="marquee-track flex items-center">
          {[...tickerBrands, ...tickerBrands].map((brand, i) => (
            <span key={i} className="flex items-center gap-4 px-8 text-gray-400 whitespace-nowrap flex-shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-gray-300 flex-shrink-0" />
              <span className="inline-flex items-center justify-center h-7 w-20 flex-shrink-0">
                {brandLogos[brand] ?? (
                  <span className="text-xs font-display font-700 uppercase tracking-widest">{brand}</span>
                )}
              </span>
            </span>
          ))}
        </div>
      </div>

      {/* Stats strip */}
      <section className="bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map(({ label, value, icon: Icon, color }) => (
              <div key={label} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center flex-shrink-0">
                  <Icon size={20} className={color} />
                </div>
                <div>
                  <div className={`font-display font-800 text-xl ${color}`}>{value}</div>
                  <div className="text-xs text-gray-500 leading-tight">{label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categorías */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="flex items-center justify-between mb-7">
          <div>
            <h2 className="font-display font-700 text-gray-900 text-2xl">Explora por categoría</h2>
            <p className="text-gray-500 text-sm mt-1">Encuentra lo que buscas en nuestras 6 categorías</p>
          </div>
          <button
            onClick={() => navigate('catalog')}
            className="hidden sm:flex items-center gap-1 text-sm text-primary font-medium hover:underline cursor-pointer"
          >
            Ver catálogo <ChevronRightIcon size={16} />
          </button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {categories.map(cat => {
            const CatIcon = categoryIconMap[cat.icon]
            return (
              <button
                key={cat.id}
                onClick={() => navigate('catalog')}
                className="group bg-white border border-border rounded-2xl p-4 flex flex-col items-center gap-2.5 hover:border-primary/30 hover:shadow-md transition-all cursor-pointer"
                style={{ transition: 'all 0.2s' }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg, rgba(139,92,246,0.1), rgba(6,182,212,0.1))' }}
                >
                  {CatIcon && <CatIcon size={26} strokeWidth={1.7} className="text-primary" />}
                </div>
                <div className="text-center">
                  <div className="font-display font-600 text-gray-800 text-sm group-hover:text-primary transition-colors">{cat.name}</div>
                  <div className="text-xs text-gray-400 mt-0.5">{products.filter(p => p.category === cat.id).length} productos</div>
                </div>
              </button>
            )
          })}
        </div>
      </section>

      {/* Ofertas exclusivas banner */}
      <section className="mx-4 sm:mx-6 lg:mx-8 xl:mx-auto xl:max-w-7xl rounded-3xl overflow-hidden mb-14">
        <div
          className="relative px-8 py-10"
          style={{ background: 'linear-gradient(135deg, #0B0B14 0%, #1a0533 50%, #0B0B14 100%)' }}
        >
          {/* glow fondo */}
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 60%, rgba(139,92,246,0.25) 0%, transparent 70%)' }} />

          <div className="relative grid lg:grid-cols-3 gap-6 items-center">

            {/* Columna izquierda: texto + botón */}
            <div>
              <div
                className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1 rounded-full mb-4 uppercase tracking-wider"
                style={{ background: 'rgba(139,92,246,0.2)', color: '#C4B5FD', border: '1px solid rgba(139,92,246,0.3)' }}
              >
                Ofertas exclusivas
              </div>
              <h2 className="font-display font-800 text-white text-3xl sm:text-4xl mb-3 leading-tight">
                Las mejores marcas,{' '}
                <span style={{ background: 'linear-gradient(135deg, #8B5CF6, #06B6D4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  los mejores precios
                </span>
              </h2>
              <p className="text-white/50 text-sm mb-7">
                Encuentra las mejores ofertas en tecnología de las marcas que confías.
              </p>
              <button
                onClick={() => navigate('catalog')}
                className="px-6 py-3 text-white text-sm font-semibold rounded-xl cursor-pointer"
                style={{ background: 'linear-gradient(135deg, #8B5CF6, #06B6D4)' }}
              >
                Ver ofertas
              </button>
            </div>

            {/* Columna central: laptop con glow ring */}
            <div className="hidden lg:flex items-center justify-center relative h-56">
              <div
                className="absolute rounded-full"
                style={{
                  width: '220px', height: '220px',
                  background: 'transparent',
                  border: '2px solid rgba(139,92,246,0.5)',
                  boxShadow: '0 0 60px 20px rgba(139,92,246,0.35), inset 0 0 40px 10px rgba(139,92,246,0.15)',
                }}
              />
              <img
                src="/laptop-banner.jpg"
                alt="Laptop en oferta"
                className="relative z-10 w-56 object-contain drop-shadow-2xl cursor-pointer transition-all duration-500 hover:scale-110 hover:-translate-y-3"
                style={{ filter: 'drop-shadow(0 0 24px rgba(139,92,246,0.5))' }}
                onMouseEnter={e => (e.currentTarget.style.filter = 'drop-shadow(0 0 40px rgba(139,92,246,0.85))')}
                onMouseLeave={e => (e.currentTarget.style.filter = 'drop-shadow(0 0 24px rgba(139,92,246,0.5))')}
              />
            </div>

            {/* Columna derecha: logos sin cuadro | línea | 30% */}
            <div className="flex items-center gap-5">
              {/* Grid de logos sin cuadros */}
              <div className="grid grid-cols-3 gap-x-12 gap-y-10">
                {ofertaMarcas.map(m => (
                  <div
                    key={m.key}
                    className="flex items-center justify-center"
                    style={{ transform: 'scale(2.1)', transformOrigin: 'center' }}
                  >
                    {m.svg}
                  </div>
                ))}
              </div>

              {/* Línea divisoria vertical */}
              <div className="self-stretch w-px flex-shrink-0" style={{ background: 'rgba(255,255,255,0.3)' }} />

              {/* Descuento */}
              <div className="flex-shrink-0">
                <p className="text-white/40 text-xs font-semibold uppercase tracking-widest mb-1">Hasta</p>
                <p
                  className="font-display font-900 text-5xl leading-none"
                  style={{ background: 'linear-gradient(135deg, #8B5CF6, #06B6D4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
                >
                  30%
                </p>
                <p
                  className="font-display font-800 text-2xl leading-none mb-2"
                  style={{ background: 'linear-gradient(135deg, #8B5CF6, #06B6D4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
                >
                  OFF
                </p>
                <p className="text-white/40 text-xs leading-snug">En productos<br />seleccionados</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Productos destacados */}
      <section className="bg-white py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-7">
            <div>
              <h2 className="font-display font-700 text-gray-900 text-2xl">Productos destacados</h2>
              <p className="text-gray-500 text-sm mt-1">Los más valorados por nuestra comunidad</p>
            </div>
            <button
              onClick={() => navigate('catalog')}
              className="flex items-center gap-1 text-sm text-primary font-medium hover:underline cursor-pointer"
            >
              Ver todos <ChevronRightIcon size={16} />
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {featured.map(product => (
              <TarjetaProducto key={product.id} product={product} ctx={ctx} />
            ))}
          </div>
        </div>
      </section>

      {/* Productos recientes */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="flex items-center justify-between mb-7">
          <div>
            <h2 className="font-display font-700 text-gray-900 text-2xl">Recién llegados</h2>
            <p className="text-gray-500 text-sm mt-1">Novedades en nuestro catálogo</p>
          </div>
          <button
            onClick={() => navigate('catalog')}
            className="flex items-center gap-1 text-sm text-primary font-medium hover:underline cursor-pointer"
          >
            Ver todos <ChevronRightIcon size={16} />
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {recent.map(product => (
            <TarjetaProducto key={product.id} product={product} ctx={ctx} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary-50 border-y border-primary-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 text-center">
          <h2 className="font-display font-700 text-gray-900 text-2xl sm:text-3xl mb-3">
            Únete a{' '}
            <span style={{ background: 'linear-gradient(135deg, #8B5CF6, #06B6D4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              EVOX
            </span>{' '}
            hoy
          </h2>
          <p className="text-gray-500 text-base mb-7 max-w-md mx-auto">
            Crea tu cuenta gratuita, guarda tus productos favoritos y recibe ofertas exclusivas.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => navigate('register')}
              className="px-6 py-3 text-white font-semibold rounded-xl cursor-pointer shadow-sm"
              style={{ background: 'linear-gradient(135deg, #8B5CF6, #7C3AED)' }}
            >
              Crear cuenta gratuita
            </button>
            <button
              onClick={() => navigate('catalog')}
              className="px-6 py-3 bg-white text-gray-700 font-semibold rounded-xl border border-border hover:bg-gray-50 transition-colors cursor-pointer"
            >
              Explorar catálogo
            </button>
          </div>
        </div>
      </section>

      <PieDePagina navigate={navigate} />
    </div>
  )
}
