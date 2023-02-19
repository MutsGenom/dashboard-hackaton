import React, { useEffect, useState } from "react"

function EventsMap(){
    const [] = useState()

    useEffect(()=>{
        async function getData() {
			const servData = await fetch(
				"https://dobro.ru/api/v2/education_level",
				{
					method: "GET",
					headers: {
						"Content-Type": "application/json",
					},
				}
			);
			const resp = await servData.json();
            console.log(resp);
        }
        getData()
    }, [])

    return (
        <div>
            <h1>Карта событий</h1>

        </div>
    )
}

export default EventsMap