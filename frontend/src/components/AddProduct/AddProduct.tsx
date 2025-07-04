import { useState } from 'react';
import type { Product } from '../../interfaces/Product.interface';

interface Props {
    onProductAdded: (newProduct: Product) => void;
}

const renderSetData = (
    label: string,
    type: string,
    value: string | number,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
) => (
    <div className='mb-3'>
        <label className='form-label'>{ label }:</label>
        <input
            type={ type }
            className='form-control'
            value={ value }
            onChange={ onChange }
            required
        />
    </div>
);

function AddProduct({ onProductAdded }: Props) {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [code, setCode] = useState('');
    const [category, setCategory] = useState('');
    const [cost_price, setCostPrice] = useState('');
    const [sales_price, setSalesPrice] = useState('');
    const [sold_price, setSoldPrice] = useState('');
    const [incoming_date, setIncomingDate] = useState('');
    const [outgoing_date, setOutgoingDate] = useState('');
    const [reason_outgoing, setReasonOutgoing] = useState('');
    const [payment_date, setPaymentDate] = useState('');
    const [payment_method, setPaymentMethod] = useState('');
    const [note, setNote] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const toNumber = (v: string) => (v.trim() === '' ? null : parseFloat(v));

        const toText = (v: string) => (v.trim() === '' ? null : v.trim());

        const newProduct = {
            code: toText(code),
            name: name.trim(),
            price: parseFloat(price),
            category: toText(category),
            cost_price: toNumber(cost_price),
            sales_price: toNumber(sales_price),
            sold_price: toNumber(sold_price),
            incoming_date: toText(incoming_date),
            outgoing_date: toText(outgoing_date),
            reason_outgoing: toText(reason_outgoing),
            payment_date: toText(payment_date),
            payment_method: toText(payment_method),
            note: toText(note),
        };

        if (!newProduct.name || isNaN(newProduct.price)) {
            alert("Nombre y precio son obligatorios");
            return;
        }

        try {
            const res = await fetch('http://localhost:3001/api/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newProduct),
            });
        
            const data = await res.json();
        
            if (res.ok) {
                onProductAdded(data);
                setName('');
                setPrice('');
                setCode('');
                setCategory('');
                setCostPrice('');
                setSalesPrice('');
                setSoldPrice('');
                setIncomingDate('');
                setOutgoingDate('');
                setReasonOutgoing('');
                setPaymentDate('');
                setPaymentMethod('');
                setNote('');
            } else {
                alert("Error al agregar el producto: " + (data.error || ''));
            }
        } catch (err) {
            console.error(err);
            alert ("Erorr de conexión al servidor");
        }
    };

    return (
        <form onSubmit={ handleSubmit } className='mb-4'>
            <h2>Agregar nuevo producto</h2>
            {renderSetData('Nombre', 'text', name, (e) => setName(e.target.value))}
            {renderSetData('Precio', 'number', price, (e) => setPrice(e.target.value))}
            {renderSetData('Código', 'text', code, (e) => setCode(e.target.value))}
            {renderSetData('Categoría', 'text', category, (e) => setCategory(e.target.value))}
            {renderSetData('Precio de Costo', 'number', cost_price, (e) => setCostPrice(e.target.value))}
            {renderSetData('Precio de Venta', 'number', sales_price, (e) => setSalesPrice(e.target.value))}
            {renderSetData('Precio Vendido', 'number', sold_price, (e) => setSoldPrice(e.target.value))}
            {renderSetData('Fecha de Ingreso', 'date', incoming_date, (e) => setIncomingDate(e.target.value))}
            {renderSetData('Fecha de Salida', 'date', outgoing_date, (e) => setOutgoingDate(e.target.value))}
            {renderSetData('Motivo de Salida', 'text', reason_outgoing, (e) => setReasonOutgoing(e.target.value))}
            {renderSetData('Fecha de Pago', 'date', payment_date, (e) => setPaymentDate(e.target.value))}
            {renderSetData('Método de Pago', 'text', payment_method, (e) => setPaymentMethod(e.target.value))}
            {renderSetData('Nota', 'text', note, (e) => setNote(e.target.value))}
            <button type='submit' className='btn btn-primary'>
                Agregar
            </button>
        </form>
    );
}

export default AddProduct;
