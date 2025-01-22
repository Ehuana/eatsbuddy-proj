<template>
    <div class="bg-white rounded-5 text-center p-4" :data-aos="animation" :data-aos-duration="duration">
        <i :class="['text-success big-i', iconClass]"></i>
        <div class="pt-3">
            <h4 class="fw-bold">{{ title }}</h4>
            <p class="text-muted mb-0">{{ content }}</p>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        iconClass: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        content: {
            type: String,
            required: true
        },
        animation: {
            type: String,
            default: 'flip-left'
        },
        duration: {
            type: Number,
            default: 1300
        }
    }
};
</script>

<style scoped>
.big-i {
    font-size: 4rem;
}
</style>
