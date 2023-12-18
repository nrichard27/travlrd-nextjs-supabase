export function cl(class_names_1: string, class_names_2?: string) {
    return `${class_names_1} ${class_names_2 || ''}`;
}
