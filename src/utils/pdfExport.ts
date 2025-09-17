import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import type { MeetingMinutes } from '../types/meeting';
import { format } from 'date-fns';

export const exportToPDF = async (meeting: MeetingMinutes, elementId: string) => {
  try {
    const element = document.getElementById(elementId);
    if (!element) {
      throw new Error('Element not found for PDF export');
    }

    // Create canvas from HTML element
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff'
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');

    const imgWidth = 210; // A4 width in mm
    const pageHeight = 295; // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;
    let position = 0;

    // Add first page
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    // Add additional pages if needed
    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    // Generate filename with meeting title and date
    const dateStr = format(meeting.date, 'yyyy-MM-dd');
    const filename = `ata-reuniao-${meeting.title.replace(/\s+/g, '-').toLowerCase()}-${dateStr}.pdf`;

    pdf.save(filename);
  } catch (error) {
    console.error('Error exporting to PDF:', error);
    throw new Error('Failed to export PDF');
  }
};

export const generatePDFContent = (meeting: MeetingMinutes): string => {
  const formatDate = (date: Date) => format(date, 'dd/MM/yyyy');
  const formatTime = (time: string) => time || 'Não informado';

  return `
    <div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; background: white;">
      <header style="text-align: center; margin-bottom: 30px; border-bottom: 2px solid #333; padding-bottom: 20px;">
        <h1 style="color: #333; margin: 0;">ATA DE REUNIÃO</h1>
        <h2 style="color: #666; margin: 10px 0 0 0;">${meeting.title}</h2>
      </header>

      <section style="margin-bottom: 25px;">
        <h3 style="color: #333; border-bottom: 1px solid #ccc; padding-bottom: 5px;">INFORMAÇÕES GERAIS</h3>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-top: 15px;">
          <div><strong>Data:</strong> ${formatDate(meeting.date)}</div>
          <div><strong>Horário de Início:</strong> ${formatTime(meeting.startTime)}</div>
          <div><strong>Horário de Término:</strong> ${formatTime(meeting.endTime || '')}</div>
          <div><strong>Local:</strong> ${meeting.location || 'Não informado'}</div>
        </div>
      </section>

      <section style="margin-bottom: 25px;">
        <h3 style="color: #333; border-bottom: 1px solid #ccc; padding-bottom: 5px;">PARTICIPANTES</h3>
        <ul style="margin-top: 15px;">
          ${meeting.participants.map(p =>
            `<li><strong>${p.name}</strong>${p.role ? ` - ${p.role}` : ''}${p.email ? ` (${p.email})` : ''}</li>`
          ).join('')}
        </ul>
      </section>

      ${meeting.agenda.length > 0 ? `
        <section style="margin-bottom: 25px;">
          <h3 style="color: #333; border-bottom: 1px solid #ccc; padding-bottom: 5px;">PAUTA</h3>
          <ul style="margin-top: 15px;">
            ${meeting.agenda.map(item => `<li>${item}</li>`).join('')}
          </ul>
        </section>
      ` : ''}

      ${meeting.discussions.length > 0 ? `
        <section style="margin-bottom: 25px;">
          <h3 style="color: #333; border-bottom: 1px solid #ccc; padding-bottom: 5px;">DISCUSSÕES</h3>
          ${meeting.discussions.map(d => `
            <div style="margin-bottom: 15px; padding: 10px; background: #f9f9f9; border-left: 4px solid #333;">
              <h4 style="margin: 0 0 10px 0; color: #333;">${d.topic}</h4>
              <p style="margin: 0;">${d.description}</p>
              ${d.notes ? `<p style="margin: 10px 0 0 0; font-style: italic;">Observações: ${d.notes}</p>` : ''}
            </div>
          `).join('')}
        </section>
      ` : ''}

      ${meeting.decisions.length > 0 ? `
        <section style="margin-bottom: 25px;">
          <h3 style="color: #333; border-bottom: 1px solid #ccc; padding-bottom: 5px;">DECISÕES TOMADAS</h3>
          ${meeting.decisions.map(d => `
            <div style="margin-bottom: 15px; padding: 10px; background: #e8f5e8; border-left: 4px solid #28a745;">
              <h4 style="margin: 0 0 10px 0; color: #333;">${d.topic}</h4>
              <p style="margin: 0;"><strong>Decisão:</strong> ${d.decision}</p>
              ${d.rationale ? `<p style="margin: 10px 0 0 0;"><strong>Justificativa:</strong> ${d.rationale}</p>` : ''}
            </div>
          `).join('')}
        </section>
      ` : ''}

      ${meeting.actionItems.length > 0 ? `
        <section style="margin-bottom: 25px;">
          <h3 style="color: #333; border-bottom: 1px solid #ccc; padding-bottom: 5px;">AÇÕES E TAREFAS</h3>
          <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
            <thead>
              <tr style="background: #f1f1f1;">
                <th style="border: 1px solid #ddd; padding: 10px; text-align: left;">Descrição</th>
                <th style="border: 1px solid #ddd; padding: 10px; text-align: left;">Responsável</th>
                <th style="border: 1px solid #ddd; padding: 10px; text-align: left;">Prazo</th>
                <th style="border: 1px solid #ddd; padding: 10px; text-align: left;">Status</th>
              </tr>
            </thead>
            <tbody>
              ${meeting.actionItems.map(item => `
                <tr>
                  <td style="border: 1px solid #ddd; padding: 10px;">${item.description}</td>
                  <td style="border: 1px solid #ddd; padding: 10px;">${item.responsible}</td>
                  <td style="border: 1px solid #ddd; padding: 10px;">${formatDate(item.dueDate)}</td>
                  <td style="border: 1px solid #ddd; padding: 10px;">
                    <span style="
                      padding: 4px 8px;
                      border-radius: 4px;
                      font-size: 12px;
                      background: ${item.status === 'completed' ? '#d4edda' : item.status === 'in-progress' ? '#fff3cd' : '#f8d7da'};
                      color: ${item.status === 'completed' ? '#155724' : item.status === 'in-progress' ? '#856404' : '#721c24'};
                    ">
                      ${item.status === 'completed' ? 'Concluída' : item.status === 'in-progress' ? 'Em Andamento' : 'Pendente'}
                    </span>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </section>
      ` : ''}

      ${meeting.generalNotes ? `
        <section style="margin-bottom: 25px;">
          <h3 style="color: #333; border-bottom: 1px solid #ccc; padding-bottom: 5px;">OBSERVAÇÕES GERAIS</h3>
          <div style="margin-top: 15px; padding: 15px; background: #f8f9fa; border-radius: 4px;">
            ${meeting.generalNotes}
          </div>
        </section>
      ` : ''}

      <footer style="margin-top: 40px; text-align: center; font-size: 12px; color: #666; border-top: 1px solid #ccc; padding-top: 20px;">
        <p>Ata gerada em ${formatDate(new Date())} às ${format(new Date(), 'HH:mm')}</p>
        <p>Sistema de Criação de Atas de Reunião</p>
      </footer>
    </div>
  `;
};