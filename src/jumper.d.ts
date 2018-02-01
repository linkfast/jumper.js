 /*Jumper.js
 https://github.com/QOXCorp/jumper.js
 0.0.4
 (C) 2017 - Giancarlo Chiappe Aguilar <gchiappe@qox-corp.com>
 */

interface JumperAction {
    useItemHandler?: boolean
    url?: string
    method?: (item: JumperData) => void
}

interface JumperData {
    name: string
    help: string
    keywords?: string
    navcode?: string
    action: JumperAction
    extra?: any
}

interface JumperOptions {
    bindFnKeys?: (event: JQueryEventObject) => boolean
    bindLetter?: string
    cache?: boolean
    ajax?: boolean
    ajaxserver?: string
    data: JumperData[]
    debug?: boolean
}

interface JumperIntOptions {
    bindFnKeys: (event: JQueryEventObject) => boolean
    bindLetter: string
    data: JumperData[]

    ajax: boolean
    ajaxserver: string
    cacheAtInit: boolean
    debug: boolean
}

interface JumperObj {
    (options: JumperOptions): void
    UpdateBSD?: (setHtml: boolean) => void
    Open?: () => void
    Log?: (...args: any[]) => void
    ItemHandler?: (item: JumperData) => void
    Options?: JumperIntOptions
    Rebind?: () => void
    ProcessKey?: (event: JQueryEventObject) => void
    Unbind?: () => void

    Cache?: boolean
    InCache?: boolean

    VERSION?: string
    KeysControl?: string
    Initialized?: boolean
    Bootstrap3?: boolean
    BSD_Object?: any
    BSD_Open?: boolean
    BSD_AjaxLoader?: any

    TEXT_Loading?: string
    TEXT_DefaultTitle?: string
    TEXT_QuickNav?: string
    TEXT_Navigating?: string
    TEXT_Keywords?: string
}

declare module "jumper" {
    export = Jumper
}
declare var Jumper: JumperObj
