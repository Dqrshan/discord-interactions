/**
 * The type of component
 * @see {@link https://discord.com/developers/docs/interactions/message-components#component-object-component-types}
 */
export enum MessageComponentTypes {
    ACTION_ROW = 1,
    BUTTON = 2,
    STRING_SELECT = 3,
    INPUT_TEXT = 4,
    USER_SELECT = 5,
    ROLE_SELECT = 6,
    MENTIONABLE_SELECT = 7,
    CHANNEL_SELECT = 8
}

export type MessageComponent = Button | ActionRow | StringSelectMenu | TextInput;

/**
 * Button component
 * @see {@link https://discord.com/developers/docs/interactions/message-components#button-object-button-structure}
 */
export class Button {
    type: MessageComponentTypes.BUTTON;
    style: ButtonStyle.PRIMARY | ButtonStyle.SECONDARY | ButtonStyle.SUCCESS | ButtonStyle.DANGER | ButtonStyle.LINK;
    label: string;
    emoji?: Pick<EmojiInfo, 'id' | 'name' | 'animated'>;
    custom_id?: string;
    url?: string;
    disabled?: boolean;
    constructor(options: Omit<Button, 'type'>) {
        this.type = MessageComponentTypes.BUTTON;
        this.style = options.style;
        this.label = options.label;
        this.emoji = options.emoji;
        this.custom_id = options.custom_id;
        this.url = options.url;
        this.disabled = options.disabled;
    }
}

export enum ButtonStyle {
    PRIMARY = 1,
    SECONDARY = 2,
    SUCCESS = 3,
    DANGER = 4,
    LINK = 5
}

/**
 * Action row component
 * @see {@link https://discord.com/developers/docs/interactions/message-components#action-rows}
 */
export class ActionRow {
    type: MessageComponentTypes.ACTION_ROW;
    components: Exclude<MessageComponent, ActionRow>[];
    constructor(components: Exclude<MessageComponent, ActionRow>[]) {
        this.type = MessageComponentTypes.ACTION_ROW;
        this.components = components;
    }
}

export type SelectComponentType =
    | MessageComponentTypes.STRING_SELECT
    | MessageComponentTypes.USER_SELECT
    | MessageComponentTypes.ROLE_SELECT
    | MessageComponentTypes.MENTIONABLE_SELECT
    | MessageComponentTypes.CHANNEL_SELECT;

// This parent type is to simplify the individual selects while keeping descriptive generated type hints
export class SelectMenu<T extends SelectComponentType> {
    type: T;
    custom_id: string;
    placeholder?: string;
    min_values?: number;
    max_values?: number;
    disabled?: boolean;
    options: StringSelectOption[];
    channel_types?: ChannelTypes[];
    constructor(options: SelectMenu<T>) {
        this.type = options.type;
        this.custom_id = options.custom_id;
        this.placeholder = options.placeholder;
        this.min_values = options.min_values;
        this.max_values = options.max_values;
        this.disabled = options.disabled;
        this.options = options.options;
        this.channel_types = options.channel_types;
    }
}

/**
 * Text select menu component
 * @see {@link https://discord.com/developers/docs/interactions/message-components#select-menu-object-select-menu-structure}
 */
export class StringSelectMenu extends SelectMenu<MessageComponentTypes.STRING_SELECT> {
    constructor(options: Omit<SelectMenu<MessageComponentTypes.STRING_SELECT>, 'channel_types' | 'type'>) {
        super({
            type: MessageComponentTypes.STRING_SELECT,
            ...options
        });
        this.type = MessageComponentTypes.STRING_SELECT;
    }
}

export type StringSelectOption = {
    label: string;
    value: string;
    description?: string;
    emoji?: Pick<EmojiInfo, 'id' | 'name' | 'animated'>;
    default?: boolean;
};

type SelectMenuNoOptions<T extends SelectComponentType> = Omit<SelectMenu<T>, 'options'>;

/**
 * User select menu component
 * @see {@link https://discord.com/developers/docs/interactions/message-components#select-menu-object-select-menu-structure}
 */
export class UserSelectMenu {
    private _options: SelectMenuNoOptions<MessageComponentTypes.USER_SELECT>;
    constructor(options: Omit<SelectMenuNoOptions<MessageComponentTypes.USER_SELECT>, 'channel_types' | 'type'>) {
        this._options = { type: MessageComponentTypes.USER_SELECT, ...options };
    }
}
/**
 * Role select menu component
 * @see {@link https://discord.com/developers/docs/interactions/message-components#select-menu-object-select-menu-structure}
 */
export class RoleSelectMenu {
    private _options: SelectMenuNoOptions<MessageComponentTypes.ROLE_SELECT>;
    constructor(options: Omit<SelectMenuNoOptions<MessageComponentTypes.ROLE_SELECT>, 'channel_types' | 'type'>) {
        this._options = { type: MessageComponentTypes.ROLE_SELECT, ...options };
    }
}

/**
 * Mentionable (role & user) select menu component
 * @see {@link https://discord.com/developers/docs/interactions/message-components#select-menu-object-select-menu-structure}
 */
export class MentionableSelectMenu {
    private _options: SelectMenuNoOptions<MessageComponentTypes.MENTIONABLE_SELECT>;
    constructor(
        options: Omit<SelectMenuNoOptions<MessageComponentTypes.MENTIONABLE_SELECT>, 'channel_types' | 'type'>
    ) {
        this._options = { type: MessageComponentTypes.MENTIONABLE_SELECT, ...options };
    }
}

/**
 * Channel select menu component
 * @see {@link https://discord.com/developers/docs/interactions/message-components#select-menu-object-select-menu-structure}
 */
export class ChannelSelectMenu {
    private _options: SelectMenuNoOptions<MessageComponentTypes.CHANNEL_SELECT>;
    constructor(options: Omit<SelectMenuNoOptions<MessageComponentTypes.CHANNEL_SELECT>, 'type'>) {
        this._options = { type: MessageComponentTypes.CHANNEL_SELECT, ...options };
    }
}

export enum ChannelTypes {
    DM = 1,
    GROUP_DM = 3,
    GUILD_TEXT = 0,
    GUILD_VOICE = 2,
    GUILD_CATEGORY = 4,
    GUILD_ANNOUNCEMENT = 5,
    GUILD_STORE = 6
}

/**
 * Text input component
 * @see {@link https://discord.com/developers/docs/interactions/message-components#text-inputs-text-input-structure}
 */
export class TextInput {
    type: MessageComponentTypes.INPUT_TEXT;
    custom_id: string;
    style: TextStyle.SHORT | TextStyle.PARAGRAPH;
    label: string;
    min_length?: number;
    max_length?: number;
    required?: boolean;
    value?: string;
    placeholder?: string;
    constructor(options: Omit<TextInput, 'type'>) {
        this.type = MessageComponentTypes.INPUT_TEXT;
        this.custom_id = options.custom_id;
        this.style = options.style;
        this.label = options.label;
        this.min_length = options.min_length;
        this.max_length = options.max_length;
        this.required = options.required;
        this.value = options.value;
        this.placeholder = options.placeholder;
    }
}

export enum TextStyle {
    SHORT = 1,
    PARAGRAPH = 2
}

export type EmojiInfo = {
    name: string | undefined;
    id: string | undefined;
    // Should define the user object in future
    user?: { [key: string]: unknown };
    roles?: string[];
    require_colons?: boolean;
    managed?: boolean;
    available?: boolean;
    animated?: boolean;
};
