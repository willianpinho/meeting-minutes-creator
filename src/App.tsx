import { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Add, Description, Visibility, ArrowBack } from '@mui/icons-material';

import { Button } from './components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';
import { MeetingForm } from './components/MeetingForm';
import { MeetingList } from './components/MeetingList';
import { MeetingPreview } from './components/MeetingPreview';

import { useMeetings } from './hooks/useMeetings';
import type { MeetingMinutes } from './types/meeting';
import { exportToPDF } from './utils/pdfExport';

type View = 'list' | 'form' | 'preview';

// Material-UI theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  const { meetings, loading, saveMeeting, deleteMeeting } = useMeetings();
  const [currentView, setCurrentView] = useState<View>('list');
  const [editingMeeting, setEditingMeeting] = useState<MeetingMinutes | undefined>();
  const [previewMeeting, setPreviewMeeting] = useState<MeetingMinutes | undefined>();

  const handleNewMeeting = () => {
    setEditingMeeting(undefined);
    setCurrentView('form');
  };

  const handleEditMeeting = (meeting: MeetingMinutes) => {
    setEditingMeeting(meeting);
    setCurrentView('form');
  };

  const handleSaveMeeting = (meeting: MeetingMinutes) => {
    try {
      saveMeeting(meeting);
      setCurrentView('list');
      setEditingMeeting(undefined);
    } catch (error) {
      console.error('Error saving meeting:', error);
      // In a real app, you'd show a toast/notification here
      alert('Erro ao salvar a ata. Tente novamente.');
    }
  };

  const handleDeleteMeeting = (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir esta ata?')) {
      try {
        deleteMeeting(id);
      } catch (error) {
        console.error('Error deleting meeting:', error);
        alert('Erro ao excluir a ata. Tente novamente.');
      }
    }
  };

  // const handlePreviewMeeting = (meeting: MeetingMinutes) => {
  //   setPreviewMeeting(meeting);
  //   setCurrentView('preview');
  // };

  const handleExportMeeting = async (meeting: MeetingMinutes) => {
    try {
      setPreviewMeeting(meeting);
      setCurrentView('preview');

      // Wait a moment for the preview to render
      setTimeout(async () => {
        try {
          await exportToPDF(meeting, 'meeting-preview');
        } catch (error) {
          console.error('Error exporting PDF:', error);
          alert('Erro ao exportar PDF. Tente novamente.');
        }
      }, 100);
    } catch (error) {
      console.error('Error preparing export:', error);
      alert('Erro ao preparar exportação. Tente novamente.');
    }
  };

  const handleCancelForm = () => {
    setCurrentView('list');
    setEditingMeeting(undefined);
  };

  const handleBackToList = () => {
    setCurrentView('list');
    setPreviewMeeting(undefined);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Criador de Atas de Reunião</h1>
            <p className="text-muted-foreground mt-1">
              Crie, edite e gerencie suas atas de reunião de forma simples e eficiente
            </p>
          </div>

          {currentView === 'list' && (
            <Button onClick={handleNewMeeting} size="lg">
              <Add className="h-5 w-5 mr-2" />
              Nova Ata
            </Button>
          )}

          {currentView === 'form' && (
            <Button onClick={handleCancelForm} variant="outline">
              Voltar à Lista
            </Button>
          )}

          {currentView === 'preview' && (
            <div className="flex gap-2">
              <Button
                onClick={() => previewMeeting && exportToPDF(previewMeeting, 'meeting-preview')}
                variant="outline"
              >
                <Description className="h-4 w-4 mr-2" />
                Exportar PDF
              </Button>
              <Button onClick={handleBackToList} variant="outline">
                Voltar à Lista
              </Button>
            </div>
          )}
        </div>

        {/* Main Content */}
        <div>
        {loading && (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Carregando...</p>
            </div>
          </div>
        )}

        {!loading && currentView === 'list' && (
          <div>
            {meetings.length === 0 ? (
              <Card className="text-center py-12">
                <CardHeader>
                  <div className="mx-auto mb-4">
                    <Description className="h-12 w-12 mx-auto text-muted-foreground" />
                  </div>
                  <CardTitle>Bem-vindo ao Criador de Atas!</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-6">
                    Você ainda não possui nenhuma ata de reunião. Comece criando sua primeira ata.
                  </p>
                  <Button onClick={handleNewMeeting} size="lg">
                    <Add className="h-5 w-5 mr-2" />
                    Criar Primeira Ata
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-semibold">
                    {meetings.length} ata{meetings.length !== 1 ? 's' : ''} encontrada{meetings.length !== 1 ? 's' : ''}
                  </h2>
                </div>
                <MeetingList
                  meetings={meetings}
                  onEdit={handleEditMeeting}
                  onDelete={handleDeleteMeeting}
                  onExport={handleExportMeeting}
                />
              </div>
            )}
          </div>
        )}

        {!loading && currentView === 'form' && (
          <div>
            <div className="mb-6">
              <h2 className="text-2xl font-semibold">
                {editingMeeting ? 'Editar Ata de Reunião' : 'Nova Ata de Reunião'}
              </h2>
              <p className="text-muted-foreground">
                Preencha os campos abaixo para {editingMeeting ? 'atualizar' : 'criar'} sua ata
              </p>
            </div>
            <MeetingForm
              meeting={editingMeeting}
              onSave={handleSaveMeeting}
              onCancel={handleCancelForm}
            />
          </div>
        )}

        {!loading && currentView === 'preview' && previewMeeting && (
          <div>
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-semibold">Prévia da Ata</h2>
                <p className="text-muted-foreground">
                  Visualização de como a ata será exportada em PDF
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={() => handleEditMeeting(previewMeeting)}
                  variant="outline"
                >
                  <Visibility className="h-4 w-4 mr-2" />
                  Editar
                </Button>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border">
              <MeetingPreview meeting={previewMeeting} />
            </div>
          </div>
        )}
        </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;