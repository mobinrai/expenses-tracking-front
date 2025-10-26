import * as Icons  from '@mui/icons-material'

const DynamicIcon = ({iconName}:{iconName:string}) => {
    const IconComponent = (Icons as Record<string, React.ElementType>)[iconName];
    return IconComponent ? <IconComponent/> : <Icons.HelpOutline />; // fallback
}

export default DynamicIcon