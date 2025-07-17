import type { Producer } from '../interfaces/Producer.interface';

const API_URL = 'http://localhost:3001/api/producers';

export async function getProducers(): Promise<Producer[]> {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error('Error fetching producers');
    return res.json();
}

export async function addProducer(producer: Producer): Promise<Producer> {
    const res = await fetch(API_URL, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(producer),
    });
    if (!res.ok) throw new Error('Error adding producer');
    return res.json();
}

export async function updateProducer(id: number, producer: Producer): Promise<Producer> {
    const res = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(producer),
    });
    if (!res.ok) throw new Error('Error updating producer');
    return res.json();
}

export async function deleteProducer(id: number): Promise<void> {
    const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Error deleting producer');
}
