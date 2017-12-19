/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  return (
    <div>
      <div className="jumbotron text-center">
        <h1>Artin DNA</h1>
        <p className="lead">Open-source application for common DNA parsing operations</p>
      </div>
      <div className="row">
        <div className="col-md-12">
          <div className="col-md-4">
            <div className="panel panel-primary">
              <div className="panel-heading">
                <div className="panel-title">BAM Conversion</div>
              </div>
              <div className="panel-body">
                <p>BAM is compressed in the BGZF format. All multi-byte numbers in BAM are
                  little-endian, regardless of
                  the machine endianness. The format is formally described in the following table
                  where values in brackets are
                  the default when the corresponding information is not available; an underlined
                  word in uppercase denotes a
                  field in the SAM format.
                </p>
                <div className="pull-right">
                  <Link to="bam-conversion">
                    <button type="button" className="btn btn-default">
                      Continue <i className="fa fa-chevron-circle-right" />
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="panel panel-primary">
              <div className="panel-heading">
                <div className="panel-title">SAM Conversion</div>
              </div>
              <div className="panel-body">
                <p>SAM stands for Sequence Alignment/Map format. It is a TAB-delimited text format
                  consisting of a header
                  section, which is optional, and an alignment section. If present, the header
                  must be prior to the alignments.
                  Header lines start with ‘@’, while alignment lines do not. Each alignment line
                  has 11 mandatory fields for
                  essential alignment information such as mapping position, and variable number of
                  optional fields for flexible
                  or aligner specific information.
                </p>
                <div className="pull-right">
                  <Link to="sam-conversion">
                    <button type="button" className="btn btn-default">
                      Continue <i className="fa fa-chevron-circle-right" />
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="panel panel-primary">
              <div className="panel-heading">
                <div className="panel-title">SNP Caller</div>
              </div>
              <div className="panel-body">
                <p>SNP calling is a bit of a misnomer, as it implies finding &quot;SNPs&quot; in NGS
                  data.
                  Without information about
                  population frequency or function, it is premature to call a single nucleotide
                  change a &quot;polymorphism&quot;.
                  With that caveat in mind, &quot;SNP calling&quot; in the context of NGS data
                  analysis
                  might be definedas the process
                  of finding bases in the NGS data that differ from the reference genome,typically
                  includingan associated
                  confidence score or statistical evidence metric.Since NGS data all have finite
                  errors, this process requires
                  that a given reference base be read by the NGS technology multiple times.
                </p>
                <div className="pull-right">
                  <Link to="snp-caller">
                    <button type="button" className="btn btn-default">
                      Continue <i className="fa fa-chevron-circle-right" />
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="panel panel-primary">
              <div className="panel-heading">
                <div className="panel-title">Filtration</div>
              </div>
              <div className="panel-body">
                <p>Normally, from pre-processing to variant calling is performed on two different
                  datasets.
                  One dataset is wildtype and other is mutant. All the variants present in wild
                  type is removed from mutant.
                  This step is performed using bedtools (which we already included). This is
                  actually a subtraction operator.
                  We match position and base of wild type datasets with mutant and remove all the
                  similar mutations from mutant file.
                  Therefore, resulting file include variants from mutant only which are not
                  present in wild type datasets.
                  There are other filteration step also like removing variant having frequency of
                  occurrence less then 30%
                  and only EMS induced mutagenesis is kept (G to A or C to T) conversions.
                </p>
                <div className="pull-right">
                  <Link to="filtration">
                    <button type="button" className="btn btn-default">
                      Continue <i className="fa fa-chevron-circle-right" />
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="panel panel-primary">
              <div className="panel-heading">
                <div className="panel-title">Alignment</div>
              </div>
              <div className="panel-body">
                <p>BWA is a software package for mapping low-divergent sequences against a large
                  reference genome, such as the human genome.
                  It consists of three algorithms: BWA-backtrack, BWA-SW and BWA-MEM. The first
                  algorithm is designed for Illumina sequence reads up to 100bp,
                  while the rest two for longer sequences ranged from 70bp to 1Mbp. BWA-MEM and
                  BWA-SW share similar features such as long-read support and split alignment,
                  but BWA-MEM, which is the latest, is generally recommended for high-quality
                  queries as it is faster and more accurate.
                  BWA-MEM also has better performance than BWA-backtrack for 70-100bp Illumina
                  reads.
                </p>
                <div className="pull-right">
                  <Link to="alignment">
                    <button type="button" className="btn btn-default">
                      Continue <i className="fa fa-chevron-circle-right" />
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="panel panel-primary">
              <div className="panel-heading">
                <div className="panel-title">Quality control</div>
              </div>
              <div className="panel-body">
                <p>Cleaning your data in this way is often required: Reads from small-RNA
                  sequencing contain the 3’ sequencing
                  adapter because the read is longer than the molecule that is sequenced. Amplicon
                  reads start with a primer sequence.
                  Poly-A tails are useful for pulling out RNA from your sample, but often you
                  don’t want them to be in your reads.
                </p>
                <div className="pull-right">
                  <Link to="quality-control">
                    <button type="button" className="btn btn-default">
                      Continue <i className="fa fa-chevron-circle-right" />
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
