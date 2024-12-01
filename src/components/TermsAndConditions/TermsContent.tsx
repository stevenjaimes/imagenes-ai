import React from 'react';

interface Section {
  title: string;
  content: React.ReactNode;
}

export const termsContent: Section[] = [
  {
    title: "1. Aceptación de los Términos",
    content: (
      <p>
        Al acceder y utilizar esta página web, aceptas cumplir con los presentes Términos y
        Condiciones. Si no estás de acuerdo con alguno de ellos, te pedimos que no utilices el
        servicio.
      </p>
    ),
  },
  {
    title: "2. Descripción del Servicio",
    content: (
      <p>
        Esta página utiliza inteligencia artificial para la creación de imágenes personalizadas a
        partir de las instrucciones del usuario. Nos reservamos el derecho de modificar o interrumpir
        el servicio en cualquier momento y sin previo aviso.
      </p>
    ),
  },
  {
    title: "3. Uso Permitido",
    content: (
      <div className="space-y-4">
        <p>
          Puedes utilizar esta herramienta exclusivamente para fines personales o comerciales. No hay
          restricciones para el uso de las imágenes generadas, y puedes utilizarlas en proyectos
          comerciales o privados.
        </p>
        <p>No está permitido generar imágenes que:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Promuevan contenido ilegal, violento, obsceno o difamatorio.</li>
          <li>
            Infrinjan derechos de autor, marcas registradas u otros derechos de propiedad intelectual
            de terceros.
          </li>
        </ul>
      </div>
    ),
  },
  {
    title: "4. Propiedad Intelectual",
    content: (
      <div className="space-y-4">
        <p>
          El código y diseño de esta página web son propiedad de Henry Steeven Jaimes. Sin
          embargo, el código está disponible bajo una licencia de código abierto, lo que permite a los
          usuarios modificarlo, perfeccionarlo o crear proyectos similares de acuerdo con los términos
          de la licencia.
        </p>
        <p>
          Las imágenes generadas por la inteligencia artificial son de propiedad del usuario, y pueden
          ser utilizadas con fines comerciales o personales sin restricciones adicionales.
        </p>
      </div>
    ),
  },
  {
    title: "5. Responsabilidad del Usuario",
    content: (
      <div className="space-y-4">
        <p>
          Los usuarios son responsables del contenido que generen a través de la página web y de
          asegurarse de que no violen ninguna ley aplicable.
        </p>
        <p>
          <strong>Exclusión de Garantías:</strong> No garantizamos resultados específicos ni que las
          imágenes generadas sean adecuadas para todos los propósitos. Las imágenes generadas por la
          inteligencia artificial pueden no cumplir con las expectativas o requisitos específicos del
          usuario.
        </p>
      </div>
    ),
  },
  {
    title: "6. Limitación de Responsabilidad",
    content: (
      <div>
        <p>Esta página no se hace responsable por:</p>
        <ul className="list-disc pl-6 space-y-2 mt-2">
          <li>El mal uso de las imágenes generadas.</li>
          <li>Problemas técnicos, interrupciones del servicio o pérdidas de datos.</li>
          <li>
            La idoneidad o calidad de las imágenes generadas para fines comerciales o personales.
          </li>
        </ul>
      </div>
    ),
  },
  {
    title: "7. Modificaciones",
    content: (
      <p>
        Nos reservamos el derecho de actualizar estos Términos y Condiciones en cualquier momento. Las
        actualizaciones se publicarán en esta misma página y serán efectivas inmediatamente.
      </p>
    ),
  },
  {
    title: "8. Contacto",
    content: (
      <p>
        Si tienes preguntas sobre estos Términos y Condiciones, puedes contactarnos en el 
        siguiente correo hensteve250@gmail.com o a través de mi WhatsApp 3186411411.
      </p>
    ),
  },
];