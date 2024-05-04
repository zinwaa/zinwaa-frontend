// 辅助函数：根据字段类型获取对应的 Faker.js 生成器
import { fakerZH_CN } from '@faker-js/faker';
export const getFakerGeneratorForFieldType = (type: string) => {
    //'人名', '手机号', '地址', '邮箱', '日期', '随机字符串', '随机数字', '随机布尔值'
    let result: string = '';
    switch (type) {
        case '人名':
            result = fakerZH_CN.person.fullName();
            break;
        case '手机号':
            result = fakerZH_CN.phone.number();
            break;
        case '地址':
            result = fakerZH_CN.location.streetAddress();
            break;
        case '邮箱':
            result = fakerZH_CN.internet.email();
            break;
        case '日期':
            result = fakerZH_CN.date.past().toString();
            break;
        case '随机字符串':
            result = fakerZH_CN.lorem.word({ length: { min: 5, max: 10 } });
            break;
        case '随机数字':
            result = fakerZH_CN.number.int().toString();
            break;
        case '随机布尔值':
            result = fakerZH_CN.datatype.boolean().toString();
            break;
    }
    return result;
};

// 辅助函数：根据正则表达式生成一个匹配该正则的值
import RandExp from "randexp";
export const generateValueFromRegex = (regex: RegExp) => {
    // 实现逻辑，生成符合正则的字符串
    // const randexp = new RandExp([a-z]{6});
    const randexp = new RandExp(regex);
    // 这里仅作为示例，实际实现可能较为复杂
    return randexp.gen(); // 替换为实际生成的值
};