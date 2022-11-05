<script>
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

    export let className = "";
    export let name = "";
    export let isSignedIn = true;

    function authClicked() {
        if (isSignedIn) {
            dispatch("signout");
        } else {
            dispatch("signin");
        }
    }

</script>


<div class="header {className}">
    <div class="avatar"></div>
    <p class="username">{name}</p>

    <button style="padding: 16px 32px;" on:click|preventDefault={authClicked}>
        {#if isSignedIn}
            Выйти 
            <i style="margin-left: 8px;" class="fa-solid fa-right-from-bracket"></i>
        {:else}
            Войти
            <i style="margin-left: 8px;" class="fa-solid fa-right-to-bracket"></i>
        {/if}
    </button>
</div>

<style>
    .header {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0px 0px 0px 5px;
    }

    .avatar {
        width: 40px; 
        height: 40px;
        margin-right: 12px;
        background: rgb(235, 223, 223);
        border-radius: 50%;
    }

    .username {
        font-weight: 600;
        color: #262626;
        margin-right: 5px;
    }
</style>