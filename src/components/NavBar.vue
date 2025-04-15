<template>
    <nav class="navbar navbar-expand-lg fixed-top" :class="{ 'scrolled': isScrolled }">
        <div class="container">
            <router-link to="/" class="navbar-brand text-light fs-1">FL<span><i
                        class="bi bi-eye"></i></span>X</router-link>

            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <router-link class="nav-link text-light" :class="{ 'active': $route.path === '/' }"
                            to="/">TRENDING</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link text-light" :class="{ 'active': $route.path === '/now-playing' }"
                            to="/now-playing">NOW PLAYING</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link text-light" :class="{ 'active': $route.path === '/upcoming' }"
                            to="/upcoming">UPCOMING</router-link>
                    </li>
                </ul>

                <ul class="navbar-nav">
                    <li class="nav-item">
                        <router-link class="nav-link text-light" :class="{ 'active': $route.path === '/calendar' }"
                            to="/calendar">CALENDAR</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link text-light" :class="{ 'active': $route.path === '/watchlist' }"
                            to="/watchlist">WATCHLIST</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link text-light" :class="{ 'active': $route.path === '/tv' }"
                            to="/tv">TV</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link text-light" :class="{ 'active': $route.path === '/movies' }"
                            to="/movies">MOVIES</router-link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue';
import { useRoute } from 'vue-router'

export default {
    setup() {
        const route = useRoute()
        const isScrolled = ref(false)

        const handleScroll = () => {
            isScrolled.value = window.scrollY > 50
        }

        onMounted(() => {
            window.addEventListener('scroll', handleScroll)
        })

        onUnmounted(() => {
            window.removeEventListener('scroll', handleScroll)
        })

        return { route, isScrolled }
    }
}
</script>

<style scoped>
.navbar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1030;
    padding: 1.5rem 1rem;
    background-color: magenta;
    background-image: linear-gradient(to right, #913af5, #e934a2);
    transition: all 0.3s ease;
    height: 90px;
}

.navbar.scrolled {
    padding: 0.75rem 1rem;
    height: 60px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.nav-link {
    position: relative;
    margin: 0 10px;
    padding: 8px 0;
    display: inline-block;
}

.nav-link.active {
    font-weight: bold;
    text-decoration: none;
    padding-bottom: 10px;
}

.nav-link.active::after {
    content: '';
    position: absolute;
    bottom: 5px;
    left: 50%;
    transform: translateX(-50%);
    width: calc(100% - 15px);
    height: 2px;
    background-color: white;
    border-radius: 3px;
}

@keyframes underline {
    from {
        width: 0;
    }

    to {
        width: 100%;
    }
}

.bi-eye {
    font-weight: bold;
    margin: 0 2px;
    transition: all 0.3s ease;
}

@media (max-width: 991.98px) {
    .container {
        max-width: 100%;
        width: 100%;
        padding-left: 0;
        padding-right: 0;
        margin-left: 0;
        margin-right: 0;
    }

    .navbar {
        height: auto;
        display: flex;
        align-items: center;
    }

    .navbar-brand {
        position: absolute;
    }

    .navbar-collapse {
        position: fixed;
        top: 60px;
        left: 0;
        right: 0;
        background-color: magenta;
        background-image: linear-gradient(to right, #913af5, #e934a2);
        padding: 1rem;
        margin-top: 0;
        z-index: 1029;
        max-height: calc(100vh - 60px);
        overflow-y: auto;
    }

    .navbar-nav {
        width: 100%;
    }

    .nav-item {
        margin-bottom: 0.5rem;
    }

    .nav-link {
        margin: 0;
        padding: 0.5rem 0;
        display: inline-block;
        width: auto;
    }

    .nav-link.active::after {
        display: block;
        width: 100%;
        left: 0;
        transform: none;
    }

    .navbar-toggler {
        margin-left: auto;
    }
}

.navbar-toggler {
    border: none;
    padding: 0.25rem 0.5rem;
    position: sticky;
    top: 0;
    z-index: 1030;
}

.navbar-toggler:focus {
    box-shadow: none;
}

.navbar-toggler-icon {
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba%28255, 255, 255, 1%29' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e");
}
</style>