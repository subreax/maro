<script>
    import { Link, navigate } from "svelte-routing";
    import { Backend } from "../backend";


    export let location;
    $: {
        const urlSearchParams = new URLSearchParams(location.search);
        const params = Object.fromEntries(urlSearchParams.entries());

        Backend.confirmRegistration(params.userId, params.code)
            .then(async (response) => {
                if (response.ok) {
                    navigate("/map", { replace: true });
                } else {
                    console.log(await response.json());
                }
            });
    }

    let isConfirmationSuccessful = true;
</script>

{#if !isConfirmationSuccessful}
    <h2>Не удалось подтвердить аккаунт</h2>
    <Link to="/signin">Назад</Link>
{/if}
