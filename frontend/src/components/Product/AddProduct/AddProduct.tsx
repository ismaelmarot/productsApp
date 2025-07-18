import { useState, useEffect, useRef } from 'react';
import type { AddProductProps } from '../../../interfaces/AddProduct.interface';
import { Modal } from 'bootstrap'; 
import SuccessModal from '../../SuccessModal/SuccessModal';
import { formatPriceHelper } from '../../../helpers/formatPriceHelper';
import { toUppercaseHelper } from '../../../helpers/toUppercaseHlper';
import { getTodayDate } from '../../../helpers/getTodayDate';
import { isValidCode } from '../../../helpers/codeValidator';

const renderSetData = (
    label: string,
    type: string,
    value: string | number,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    required: boolean = false,
    placeholder?: string
) => (
    <div className='mb-3'>
        <label className='form-label'>{ label }:</label>
        <input
            type={ type }
            className='form-control'
            value={ value }
            onChange={ onChange }
            required={ required }
            placeholder={ placeholder }
        />
    </div>
);

function AddProduct({ onProductAdded }: AddProductProps) {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [code, setCode] = useState('');
    const [category, setCategory] = useState('');
    const [cost_price, setCostPrice] = useState('');
    const [sales_price, setSalesPrice] = useState('');
    const [sold_price, setSoldPrice] = useState('');
    // const [incoming_date, setIncomingDate] = useState('');
    const [outgoing_date, setOutgoingDate] = useState('');
    const [reason_outgoing, setReasonOutgoing] = useState('');
    const [payment_date, setPaymentDate] = useState('');
    const [payment_method, setPaymentMethod] = useState('');
    const [note, setNote] = useState('');
    const [incoming_date, setIncomingDate] = useState(getTodayDate());


    const [showModal, setShowModal] = useState(false);
    const modalRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (modalRef.current) {
            const modal = Modal.getOrCreateInstance(modalRef.current);
            showModal ? modal.show() : modal.hide();
        }
        }, [showModal]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
  
        const toNumber = (v: string) =>
            v.trim() === '' ? null : parseFloat(v.replace(/\./g, '').replace(',', '.'));

        const toText = (v: string) => (v.trim() === '' ? null : v.trim());

        const newProduct = {
            code: toText(code),
            name: name.trim(),
            price: toNumber(price),
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

        if (!isValidCode(code)) {
            alert("El código debe tener el formato AAA000 hasta ZZZ999 (3 letras + 3 números)");
            return;
        }

        if (
            !newProduct.name ||
            newProduct.price === null ||
            isNaN(newProduct.price)
        ) {
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
                setShowModal(true);
            } else {
                alert("Error al agregar el producto: " + (data.error || ''));
            }
        } catch (err) {
            console.error(err);
            alert ("Erorr de conexión al servidor");
        }
    };

    return (
        <>
        <form onSubmit={ handleSubmit } className='mb-4'>
            <h2>Agregar un nuevo producto</h2>
            {renderSetData('Nombre', 'text', name, (e) => setName(e.target.value), true)}
            {renderSetData('Categoría', 'text', category, (e) => setCategory(e.target.value), true)}
            {renderSetData('Código', 'text', code, (e) => setCode(toUppercaseHelper(e.target.value.slice(0, 6))), true, "De AAA000 hasta ZZZ999")}
            {renderSetData('Fecha de Ingreso', 'date', incoming_date, (e) => setIncomingDate(e.target.value), true)}
            {renderSetData('Precio', 'text', price, (e) => setPrice(formatPriceHelper(e.target.value)), true)}
            {renderSetData('Precio de Costo', 'text', cost_price, (e) => setCostPrice(formatPriceHelper(e.target.value)), true)}
            {renderSetData('Precio de Venta', 'text', sales_price, (e) => setSalesPrice(formatPriceHelper(e.target.value)), true)}
            {renderSetData('Nota', 'text', note, (e) => setNote(e.target.value))}
            {/* {renderSetData('Precio Vendido', 'number', sold_price, (e) => setSoldPrice(e.target.value))} */}
            {/* {renderSetData('Fecha de Salida', 'date', outgoing_date, (e) => setOutgoingDate(e.target.value), true)} */}
            {/* {renderSetData('Motivo de Salida', 'text', reason_outgoing, (e) => setReasonOutgoing(e.target.value), true)} */}
            {/* {renderSetData('Fecha de Pago', 'date', payment_date, (e) => setPaymentDate(e.target.value))} */}
            {/* {renderSetData('Método de Pago', 'text', payment_method, (e) => setPaymentMethod(e.target.value), true)} */}
            <button type='submit' className='btn btn-primary'>
                Agregar
            </button>
        </form>

      <SuccessModal show={showModal} onClose={() => setShowModal(false)} />
      </>
    )
}

export default AddProduct;
