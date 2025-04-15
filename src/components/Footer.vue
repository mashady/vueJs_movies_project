<template>
    <footer class="footer py-3 text-white">
        <div class="container">
            <div class="row align-items-center">
                <div class="col-12 d-flex justify-content-between align-items-center my-2">
                    <p class="mb-0">
                        <span class="fw-bold"><i class="bi bi-chat"></i> themoviedb.org</span>
                        This product uses the TMDb API but is not endorsed or certified by TMDb
                    </p>
                    <a href="https://github.com/mashady/vueJs_movies_project.git">
                        <i class="bi bi-github"></i>
                    </a>
                </div>

                <div class="col-12">
                    <RouterLink to="/login" class="login">Login</RouterLink>
                </div>
            </div>
        </div>
    </footer>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>

<style scoped>
.footer {
    width: 100%;
    min-height: 150px;
    background: linear-gradient(to right, #913af5, #e934a2);
    padding: 1.5rem 0;
}

p {
    font-size: 1.05rem;
    margin-bottom: 0;
}

.bi-github {
    color: white;
    font-size: 2.2rem;
    transition: transform 0.3s ease;
}

.bi-github:hover {
    transform: scale(1.1);
}

.login {
    text-decoration: none;
    color: white;
    font-weight: 500;
    transition: all 0.3s ease;
    display: block;
    margin-top: 1rem;
}

@media (max-width: 991.98px) {
    .container {
        width: 100%;
        max-width: none;
        padding-left: 1rem;
        padding-right: 1rem;
        margin-left: auto;
        margin-right: auto;
    }

    .col-12 {
        flex-direction: column !important;
        align-items: flex-start !important;
    }

    p {
        margin-bottom: .25rem !important;
        width: 100%;
        overflow: visible;
        white-space: normal;
        word-wrap: break-word;
    }
}
</style>