import { RiFacebookBoxLine, RiInstagramLine, RiLinkedinBoxLine, RiTelegramLine, RiTiktokLine, RiTwitterXLine, RiYoutubeLine } from "react-icons/ri"



export const iconSosmed = (platform: string) => {

    const icon = (
        platform === "facebook" ? <RiFacebookBoxLine className="w-6 h-6" /> :
            platform === "instagram" ? <RiInstagramLine className="w-6 h-6" /> :
                platform === "x" ? <RiTwitterXLine className="w-6 h-6" /> :
                    platform === "tiktok" ? <RiTiktokLine className="w-6 h-6" /> :
                        platform === "youtube" ? <RiYoutubeLine className="w-6 h-6" /> :
                            platform === "telegram" ? <RiTelegramLine className="w-6 h-6" /> :
                                platform === "linkedIn" ? <RiLinkedinBoxLine className="w-6 h-6" /> : ''
    )

    return icon
}