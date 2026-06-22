import React, { useEffect, useMemo, useState } from 'react'

const CarParts = () => {
    const [search, setSearch] = useState('')
    const [parts, setParts] = useState([])
    const [visibleCount, setVisibleCount] = useState(10)

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    const key = import.meta.env.VITE_JSONBIN_ACCESS_KEY;


    const normalizeItems = (record) => {
        if (Array.isArray(record)) {
            return record
        }

        if (record && typeof record === 'object') {
            const candidateArrays = [
                record.items,
                record.list,
                record.data,
                record.repuestos,
                record.productos,
                record.catalogo,
            ]

            const foundArray = candidateArrays.find(Array.isArray)

            if (foundArray) {
                return foundArray
            }
        }

        return []
    }

    const filteredParts = useMemo(() => {
        return parts.filter((part) => {
            const name = String(part.articleProductName ?? '').toLowerCase()
            return name.includes(search.toLowerCase())
        })
    }, [parts, search])

    useEffect(() => {
        const fetchjson = async () => {
            const headers = new Headers();
            headers.append("X-Access-Key", key);

            try {
                const response = await fetch(import.meta.env.VITE_JSONBIN_API_URL, { headers });
                const data = await response.json();

                const items = data.record.articles;
                setParts(items);
                console.log("DATA:", data);
                console.log("ITEMS:", items);
            } catch (error) {
                console.error(error);
                setError("Error cargando repuestos");
            } finally {
                setLoading(false);
            }
        };

        fetchjson();
    }, []);
    const visibleParts = filteredParts.slice(0, visibleCount)
    const hasMoreParts = filteredParts.length > visibleCount

    return (

        <div className="car-parts-page">
            <div className="search-box">
                <input
                    type="text"
                    placeholder="Buscar repuesto..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>
            <section className="car-parts-hero">
                <p className="eyebrow">Repuestos de Carro</p>
                <h1>Listado principal</h1>
                <p>Consulta el inventario disponible desde JSONBin y descubre los repuestos publicados.</p>
            </section>
            {loading ? (
                <div className="status-card">Cargando los repuestos</div>
            )
                : error ? (
                    <div className="status-card error">{error}</div>
                ) : (
                    <>
                        <div className="parts-grid">
                            {visibleParts.map((part, index) => {
                                const name = part.articleProductName
                                const category = part.supplierName
                                const description = part.articleNo
                                const image = part.s3image

                                return (
                                    <article className="part-card" key={part.articleId}>
                                        <img src={image} alt={name} style={{ width: "100%" }} />
                                        <span className="part-category">{category}</span>
                                        <h2>{name}</h2>
                                        <p>{description}</p>
                                    </article>
                                )
                            })}
                        </div>

                        {hasMoreParts ? (
                            <div className="load-more-wrap">
                                <button
                                    type="button"
                                    className="load-more-button"
                                    onClick={() => setVisibleCount((currentCount) => currentCount + 10)}
                                >
                                    Ver más
                                </button>
                            </div>
                        ) : null}
                    </>
                )}
            {!loading && !error && filteredParts.length === 0 && (
                <div className="status-card">
                    PIPIPIPIIP NO SE ENCONTRARON REPUESTOS PARA TU BÚSQUEDA PIPIPIPIIP
                </div>
            )}

        </div>
    )
}

export default CarParts
