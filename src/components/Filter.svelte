<script>
    import ChipGroup from "./ChipGroup.svelte";

    export let filterData = [
        {
            title: "Категории",
            items: [
                { textId: "", text: "Банкомат" },
                { textId: "", text: "Вендинговый аппарат" },
                { textId: "", text: "Вход" },
                { textId: "", text: "Детская площадка" },
                { textId: "", text: "Еда" },
                { textId: "", text: "Зелёная зона" },
                { textId: "", text: "Инфоцентр" },
                { textId: "", text: "Мастерская" },
                { textId: "", text: "Музей" },
                { textId: "", text: "Остановка" },
                { textId: "", text: "Павильон" },
                { textId: "", text: "Парковка" },
                { textId: "", text: "Пикник" },
                { textId: "", text: "Прокат" },
                { textId: "", text: "Пруд" },
                { textId: "", text: "Развлечения" },
                { textId: "", text: "Спорт" },
                { textId: "", text: "Такси" },
                { textId: "", text: "Туалеты" },
                { textId: "", text: "Фонтан" },
                { textId: "", text: "Храм" },
                { textId: "", text: "Читальня" }
            ]
        },
        {
            title: "Удобства",
            items: [
                { textId: "", text: "Wi-fi" },
                { textId: "", text: "Программа лояльности \"Друзья ВДНХ\""},
                { textId: "", text: "Оплата картой" }
            ]
        },
        {
            title: "Подборки",
            items: [
                { textId: "", text: "Купить билеты" },
                { textId: "", text: "Музейный город" },
                { textId: "", text: "Спорт" }
            ]
        }
    ];

</script>

<div class="block">
    {#each filterData as section}
    <div>
        <p class="title">{section.title}</p>
        <div class="content">
            <ChipGroup items={section.items} />
        </div>
    </div>
    <hr>
    {/each}

</div>

<style>
    .block {
        width: 500px;
    }

    .title {
        position: relative;
        font-size: 1rem;
        padding: 1em;
        font-weight: 600;
        color: #999999;
    }

    .content {
        padding: 10px 16px;
    }

    hr {
        color: #DBDBDBB2;
        margin: 0 1em;
    }

    
</style>
