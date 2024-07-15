import React, { useRef } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface Person {
  name: string;
  value: number;
}

interface ResultsProps {
  people: Person[];
  currency: string;
}

const Results: React.FC<ResultsProps> = ({ people, currency }) => {
  const totalBill = people.reduce((total, person) => total + person.value, 0);
  const sharePerPerson = totalBill / people.length;

  const calculateOwedAmount = (person: Person): number => {
    return Number((sharePerPerson - person.value).toFixed(2));
  };

  const resultsRef = useRef<HTMLDivElement>(null);

  const handleDownloadPDF = () => {
    if (!resultsRef.current) return;

    html2canvas(resultsRef.current!).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = pdf.internal.pageSize.getWidth();
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      const date = new Date()
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save(`results-${date.getFullYear()}-${date.getMonth()}.pdf`);
    });
  };

  return (
    <div>
      <h2>Results</h2>
      <h2>Total bill: {currency}{totalBill}</h2>
      <TableContainer component={Paper} ref={resultsRef}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><u>Name</u></TableCell>
              <TableCell><u>Amount</u></TableCell>
              <TableCell><u>Owe/Owed</u></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {people.map((person, index) => (
              <TableRow key={index}>
                <TableCell>{person.name}</TableCell>
                <TableCell>{currency}{person.value}</TableCell>
                <TableCell>
                  {calculateOwedAmount(person) > 0 ? `Owed ${currency}${calculateOwedAmount(person)}` : `Owes ${currency}${-calculateOwedAmount(person)}`}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button onClick={handleDownloadPDF}>Download as PDF</Button>
    </div>
  );
};

export default Results;


