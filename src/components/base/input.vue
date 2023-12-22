<template>
    <div class="contains">
        <label :for="props.id" :required="props.required">{{ props.label }}</label>
        <input :type="props.type" :id="props.id" :class="props.id, props.class" :placeholder="props.placeholder"
            :required='props.required' :name="props.name" :pattern="props.pattern">
    </div>
</template>


<script setup lang='ts'>

interface Props {
    label: string,
    placeholder?: string,
    required?: boolean,
    id?: string
    class?: string,
    name?: string,
    pattern?: string,
    type?: string
}
const props = withDefaults(defineProps<Props>(), {
    placeholder: '请输入',
    required: false,
    type: 'text'
})

</script>


<style scoped lang="scss">
$required: false;

.contains {
    $fontColor: rgba(0, 0, 0, 0.95);
    width: 100%;
    height: 100%;
    display: flex;

    label[required='true'] {
        &::before {
            content: '*';
            color: red;
        }
    }

    label {
        color: $fontColor;
        font-size: 14px;

        margin: 4px 8px {
            right: 15px
        }

        ;

        &::after {
            content: ':';
        }
    }

    input {
        color: $fontColor;
        font-size: 14px;
        padding: 4px 6px;
        border: 1px solid #ccc;
        border-radius: 4px;
        outline: none;
        transition: all .3s;
        flex: 1;

        &:hover {
            border: 1px solid rgb(24, 124, 255);
        }

        &:focus-within {
            border: 1px solid rgb(24, 124, 255);
            box-shadow: rgba(42, 152, 255, 0.8) 0px 0px 10px 0px;
        }
    }

}
</style>