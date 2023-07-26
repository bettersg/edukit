import { CustomTheme } from "@/App";

interface LinkProps {
    cast?: React.FC<React.HTMLProps<HTMLAnchorElement>>;
}

const Link = (props: React.HTMLProps<HTMLAnchorElement> & LinkProps) => {
    const LinkEle = props.cast;
    if (LinkEle) {
        return (
            <LinkEle {...props} className={CustomTheme.link.primary.textColor + " font-medium hover:underline " + (props.className ?? "")}>
                {props.children}
            </LinkEle>
        )
    } else {
        return (
            <a {...props} className={CustomTheme.link.primary.textColor + " font-medium hover:underline " + (props.className ?? "")}>
                {props.children}
            </a>
        )
    }
    
}

export default Link;